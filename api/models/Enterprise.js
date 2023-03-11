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
        minlength: 6
    },
    phone: {
        type: Number,
        required: true,
        minlength: 6
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Enterprise', enterpriseSchema);