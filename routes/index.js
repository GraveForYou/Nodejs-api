const userRouter = require('./user');
const authRouter = require('./auth');
const productRouter = require('./products/product');
const productAdminRouter = require('./products/productAdmin');
const errorMiddleware = require('../middleware/error');

function route(app) {

    app.use('/api/products', productAdminRouter);
    app.use('/api/products', productRouter);
    app.use('/api/users', userRouter)
    app.use('/api/auth', authRouter)
    app.use(errorMiddleware);
}

module.exports = route;