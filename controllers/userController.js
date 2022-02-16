const User = require('../models/User');
const ErrorHandler = require('../utils/errorhandler');

class UserController {

    //[GET] /api/users/
    async getAllUsers(req, res, next) {
        const users = await User.find();

        res.status(200).json({
            success: true,
            users,
            message: 'All users have been not deleted'
        });
    }

    // [GET] /api/users/me --> User
    async getUserById(req, res, next) {
        let user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'user not found !!',
            });
        };
        res.status(200).json({
            success: true,
            user,
        });
    }

    // [GET] /api/users/{id} --> Admin
    async getUserByIdAd(req, res, next) {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'user not found !!',
            });
        };

        res.status(200).json({
            success: true,
            user,
        });
    }

    // [PUT] /api/users/{id}
    async updateUserById(req, res, next) {
        const update = req.body;
        const id = req.params.id;
        const userId = req.user.id;

        if (!userId) return next(new ErrorHandler("Please Login!!!", 400))


        if (userId.toString() !== id.toString()) return res.status(401).json({
            success: false,
            message: "Sorry, you don't have the permission to update this data."
        });

        const user = await User.findByIdAndUpdate(id, { $set: update }, { new: true });

        const token = user.generateJWT();
        user.token = token;

        res.status(200).json({
            success: true,
            message: 'User has been updated',
            user,
        });

    }

    // [DELETE] /api/users/{id}
    async destroyUserById(req, res, next) {
        const id = req.params.id;
        // const user_id = req.user.id;

        //Make sure the passed id is that of the logged in user
        // if (user_id.toString() !== id.toString()) return res.status(401).json({
        //     success: false,
        //     message: "Sorry, you don't have the permission to delete this data.",
        // });

        const user = await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'User has been deleted',
            user,
        });
    }

}
module.exports = new UserController;