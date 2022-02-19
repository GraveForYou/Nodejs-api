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
            return res.status(404).json({
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
            return res.status(404).json({
                success: false,
                message: 'user not found !!',
            });
        };

        res.status(200).json({
            success: true,
            user,
        });
    }

    // [PUT] /api/users/{id}/update --> Admin
    async updateUserByIdAdmin(req, res, next) {
        const update = req.body;
        const id = req.params.id;
        const userId = req.user.id;
        console.log("update request:", req.user)
        if (!userId) return next(new ErrorHandler("Please Login!!!", 400))

        const user = await User.findByIdAndUpdate(id, { $set: update }, { new: true });

        console.log("user updated:", user)

        res.status(200).json({
            success: true,
            message: 'User has been updated',
            user,
        });

    }

    // [PUT] /api/users/me/update
    async updateUserByIdUser(req, res, next) {
        const update = req.body;
        // const id = req.params.id;
        console.log("update request:", req.user)
        const userId = req.user.id;
        console.log(userId);
        if (!userId) return next(new ErrorHandler("Please Login!!!", 400))


        const user = await User.findByIdAndUpdate(userId, { $set: update }, { new: true });

        console.log("user updated:", user)

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