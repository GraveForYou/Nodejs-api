const ErrorHandler = require('../utils/errorhandler');
const User = require('../models/User');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const jwt = require('jsonwebtoken');
class AuthController {

    //[POST] /api/auth/register
    register = catchAsyncErrors(async(req, res, next) => {
        const { name, email, password, avatar } = req.body;

        if (!(email && password && name)) {
            return next(new ErrorHandler("Please enter required input", 400))
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return next(new ErrorHandler("User Already Exist. Please Login", 401))
        }
        const user = await User.create({
            name,
            email,
            password,
            avatar,
        });
        const token = user.generateJWT();
        user.token = token;

        res.status(201).json({
            success: true,
            user,
        });

    });

    // [POST] /api/auth/login
    async login(req, res, next) {
        const { email, password } = req.body;
        //checking if user has given password and email both
        // let passwordToStr = password;
        if (!email || !password) {
            return next(new ErrorHandler("Please enter email & password", 400))
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }
        const token = user.generateJWT();
        user.token = token;

        res.status(200).json({
            success: true,
            user,
        });
    }

    // [GET] /api/users/logout
    async logout(req, res, next) {
        // const user = req.user
        // console.log(user);
        // const authHeader = req.headers.authorization;
        // if (authHeader) {
        //     const token = authHeader.split(' ')[1];
        //     jwt.destroy(token);
        // }
        // res.status(200).json({
        //     success: true,
        //     message: 'Logout successful!'
        // })
    }

}
module.exports = new AuthController;