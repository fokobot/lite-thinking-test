const mongoose = require('mongoose');

const enterpriseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 256
    },
    address: {
        type: String,
        required: true,
        min: 6,
        max: 256
    },
    nit: {
        type: Number,
        required: true,
        minLength: 6,
        maxLength: 32,
        index: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        minLength: 6,
        maxLength: 16,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Enterprise', enterpriseSchema);