const Product = require('../models/Product');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorhandler');

class ProductController {

    // [POST] api/products/new
    async createProduct(req, res, next) {

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product,
        });
    }

    // [GET] api/products/
    async getAllProducts(req, res, next) {

        const productDeletedCount = await Product.countDocumentsDeleted();

        const products = await Product.find();
        if (typeof products === 'Array' && products.length === 0) {
            res.status(200).json({
                success: false,
                products,
                productDeletedCount,
                message: 'All products have been soft deleted'
            });
        }
        res.status(200).json({
            success: true,
            productDeletedCount,
            products,
        });
    }

    // [GET] api/products/:id
    getProductById = catchAsyncErrors(async(req, res, next) => {

        let product = await Product.findById(req.params.id);
        // if (!product) {
        //     return res.status(500).json({
        //         success: false,
        //         message: 'Product not found (getbyid)!!',
        //     });
        // };

        res.status(200).json({
            success: true,
            product,
        });
    });

    // [PUT] api/products/:id
    updateProduct = catchAsyncErrors(async(req, res, next) => {

        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(500).json({
                success: false,
                message: 'Product not found!',
            });
        };
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });

        res.status(200).json({
            success: true,
            product,
        });
    });

    // [DELETE] api/products/:id/soft
    softDelete = catchAsyncErrors(async(req, res, next) => {

        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(500).json({
                success: false,
                message: 'Product not found!',
            });
        };
        await product.delete({ _id: req.params.id });

        res.status(200).json({
            success: true,
            message: 'Product (soft) deleted successfully',
            product,

        });
    });

    // [DELETE] api/products/trashes/:id/force
    forceDelete = catchAsyncErrors(async(req, res, next) => {

        let product = await Product.findOneDeleted({ _id: req.params.id });
        if (!product) {
            return res.status(500).json({
                success: false,
                message: 'Product not found (force destroy)',
            });
        };
        const productDeleteCount = await Product.deleteOne({ _id: req.params.id });

        res.status(200).json({
            success: true,
            product,
            productDeleteCount,
            message: 'Product destroyed successfully',
        });
    });

    //[GET] api/products/trashes
    getTrashProduct = catchAsyncErrors(async(req, res, next) => {

        const productsDelete = await Product.findDeleted();

        if (!productsDelete || productsDelete.length === 0) {
            res.status(500).json({
                success: true,
                message: 'No products have been deleted!!!'
            });
        }
        res.status(200).json({
            success: true,
            productsDelete,
            // message: 'This products soft delete'
        });
    });

    // [PATCH] api/products/:id/restore
    restoreProduct = catchAsyncErrors(async(req, res, next) => {

        const product = await Product.findOneDeleted({ _id: req.params.id });
        if (!product) {
            return res.status(500).json({
                success: false,
                message: 'Product not found (restore)',
            });
        }
        console.log(product)

        await Product.restore({ _id: req.params.id });

        res.status(200).json({
            success: true,
            message: 'this product before restore was successful',
            product,
        });
    });
}

module.exports = new ProductController;