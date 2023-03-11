const mongoose = require('mongoose');

const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        let products = await Product.find();
        const response = {
            count: products.length,
            products: products
        }
        if (products.length >= 0) {
            res.status(200).json(response);
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
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        enterprise: req.body.enterprise
    });

    try {
        let result = await product.save();
        console.log(result);
        res.status(201).json({
            message: 'Product created sucesfully',
            createdProduct: result
        });
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
        let products = await Enterprise.find({ enterprise: id });
        if (products.length >= 0) {
            res.status(200).json({
                products: products
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
        });
        console.log(result);
        res.status(200).json({
            message: `Product ${id} updated sucesfully`,
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
        res.status(200).json({ message: "Product deleted sucessfully", result });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}