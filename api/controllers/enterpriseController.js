const mongoose = require('mongoose');

const Enterprise = require('../models/Enterprise');

exports.getAllEnterprises = async (req, res) => {
    try {
        let enterprises = await Enterprise.find();
        const response = {
            count: enterprises.length,
            enterprises: enterprises
        }
        if (enterprises.length >= 0) {
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

exports.createEnterprise = async (req, res) => {
    const enterprise = new Enterprise({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        address: req.body.address,
        nit: req.body.nit,
        phone: req.body.phone,
        user: req.body.user,
    });

    try {
        let result = await enterprise.save();
        console.log(result);
        res.status(201).json({
            message: 'Enterprise created sucesfully',
            createdEnterprise: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        })
    }
}

exports.getEnterpriseByUser = async (req, res) => {
    try {
        const id = req.params.userId;
        let enterprise = await Enterprise.findOne({ user: id });
        if (enterprise) {
            res.status(200).json({
                enterprise: enterprise
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

exports.updateEnterprise = async (req, res) => {
    try {
        const id = req.params.enterpriseId;
        let result = await Enterprise.findOneAndUpdate({ _id: id }, {
            name: req.body.name,
            address: req.body.address,
            nit: req.body.nit,
            phone: req.body.phone
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

exports.deleteEnterprise = async (req, res) => {
    try {
        const id = req.params.enterpriseId;
        let result = await Enterprise.remove({ _id: id })
        res.status(200).json({ message: "Enterprise deleted sucessfully", result });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}