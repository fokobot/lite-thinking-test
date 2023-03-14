const mongoose = require('mongoose');
const PDFDocument = require("pdfkit-table");
const AWS = require('aws-sdk');
const fs = require("fs");
const path = require('path');
const nodemailer = require("nodemailer");

const Product = require('../models/Product');
const Enterprise = require('../models/Enterprise');

exports.getAllProducts = async (req, res) => {
    try {
        let products = await Product.find();
        const response = {
            count: products.length,
            products: products
        }
        if (products.length >= 0) {
            res.status(200).json({ data: response });
        } else {
            res.status(404).json({
                message: 'No companies found'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const enterprise = await Enterprise.findOne({ user: req.user.id });
        if (enterprise) {
            const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price,
                enterprise: enterprise._id
            });

            let result = await product.save();
            console.log(result);
            res.status(201).json({
                message: 'Product created sucesfully',
                data: result
            });
        } else {
            res.status(404).json({
                message: 'The user does not have a enterprise!'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        })
    }
}

exports.getProdutsByEnterprise = async (req, res) => {
    try {
        const id = req.params.enterpriseId;
        let products = await Product.find({ enterprise: id });
        if (products.length >= 0) {
            res.status(200).json({
                data: products
            });
        } else {
            res.status(404).json({
                message: 'No valid entry found for provided ID'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.productId;
        let result = await Product.findOneAndUpdate({ _id: id }, {
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            enterprise: req.body.enterprise
        }, {
            new: true
        });
        console.log(result);
        res.status(200).json({
            message: `Product ${id} updated sucesfully`,
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }

}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.productId;
        let result = await Product.remove({ _id: id })
        res.status(200).json({ message: "Product deleted sucessfully", data: result });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}

exports.generatePDF = async (req, res) => {
    try {
        const id = req.params.enterpriseId;
        let products = await Product.find({ enterprise: id }).sort([['name', 1]]);
        if (products.length > 0) {
            const rows = products.map(product => {
                return [product.name, product.price, product.quantity];
            })
            let doc = new PDFDocument({ margin: 30, size: 'A4' });
            const table = {
                title: "Products Inventory",
                headers: ["Name", "Price", "Quantity"],
                rows,
            };
            await doc.table(table, {
                columnsSize: [200, 100, 100],
            });
            let writeStream = fs.createWriteStream(`./${id}.pdf`);
            doc.pipe(writeStream);
            doc.end();

            writeStream.on('finish', async () => {
                const appDir = path.dirname(require.main.filename);
                const fileContent = fs.readFileSync(appDir + `/${id}.pdf`);

                const S3 = new AWS.S3({
                    region: 'us-east-1',
                    accessKeyId: process.env.ACCESS_KEY_ID,
                    secretAccessKey: process.env.SECRET_ACCESS_KEY,
                });

                let bucket = `lite-thinking-test-fo`;

                const paramsPdf = {
                    Key: `${id}.pdf`,
                    Body: fileContent,
                    Bucket: bucket,
                    ContentType: 'application/pdf'
                };
                await S3.upload(paramsPdf).promise();
                let pdfUrl = S3.getSignedUrl("getObject", { Bucket: bucket, Key: `${id}.pdf`, Expires: 3600 });
                if (req.body.email) {
                    await sendEmailWithAttachmentBase64(req.body.email, appDir + `/${id}.pdf`);
                }
                res.status(200).json({
                    message: `PDF generated successfully`,
                    data: pdfUrl
                });
            });
        } else {
            res.status(404).json({
                message: 'No products found for the provided ID'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

async function sendEmailWithAttachmentBase64(emailTo, attachments) {
    let ses = new AWS.SES({
        region: 'us-east-1',
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });
    let transporter = nodemailer.createTransport({
        SES: ses,
    });
    try {
        let data = await transporter.sendMail({
            from: `fabian.osorio.990628@gmail.com`,
            to: emailTo,
            subject: "Products Inventory",
            html: "<html><head></head><body><p>Please see the attached file for a list of products inventory.</p></body></html >",
            attachments: [fs.createReadStream(attachments)],
        });
        return data;
    } catch (err) {
        console.log("Email error:", err);
        throw err;
    }
}