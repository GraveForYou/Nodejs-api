const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [7, 'Price cannot exceed 7 characters'],
    },
    images: [{
        public_id: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            require: true,
        },
    }, ],
    category: {
        type: String,
        require: [true, 'Please enter product category'],
    },
    stock: {
        type: Number,
        require: [true, 'Please enter product Stock'],
        maxLength: [4, 'Stock cannot exceed 4 characters'],
        default: 1,
    },
    genders: [{
        type: String,
        required: true
    }],
    colors: [{
        type: String,
        required: true
    }],
    sizes: [{
        type: String,
        required: true
    }],

}, {
    timestamps: true,
});

//Add plugin
ProductSchema.plugin(mongooseDelete, { overrideMethods: true, deletedAt: true, });

module.exports = mongoose.model('Product', ProductSchema);