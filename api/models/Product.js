const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 256
    },
    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    enterprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterprise',
    },

},
    {
        timestamps: true
    });

module.exports = mongoose.model('Product', productSchema);