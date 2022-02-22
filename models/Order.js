const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    shipping_info: [{
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        }
    }, ],
    orderItems: [{
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            //required: true,
        },
        size: {
            type: String
        },
        color: {
            type: String,
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true,
        },
    }, ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        default: 'Payment on delivery'
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 1000,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 25000,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expected_deliveredAt: {
        type: Date,
    },
    canceledAt: {
        type: Date,
    },
    deliveredAt: {
        type: Date,
    },
});

module.exports = mongoose.model('Order', OrderSchema);