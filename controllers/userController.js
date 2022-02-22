const User = require('../models/User');
const ErrorHandler = require('../utils/errorhandler');

class UserController {

    //[GET] /api/users/
    async getAllUsers(req, res, next) {

        const resultPerPage = parseInt(req.query.limit || 5);
        const currentPage = parseInt(req.query.page || 1);
        const skip = resultPerPage * (currentPage - 1);

        const searchQuery = req.query.name ? {
            name: {
                $regex: req.query.name,
                $options: "i"
            }
        } : {};
        console.log("searchQuery:", searchQuery);
        console.log(req.query)
        const users = await User.find(searchQuery)
            .limit(resultPerPage)
            .skip(skip)
        const totalDocuments = await User.countDocuments();
        const totalPage = Math.ceil(totalDocuments / resultPerPage);
        res.status(200).json({
            success: true,
            users,
            data: {
                currentPage,
                resultPerPage,
                totalDocuments,
                totalPage,
            },
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
        if (!userId) return next(new ErrorHandler("Please Login!!!", 401))

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
        console.log("update request:", req.user)
        const userId = req.user.id;
        console.log(userId);
        if (!userId) return next(new ErrorHandler("Please Login!!!", 401))


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

        const user = await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'User has been deleted',
            user,
        });
    }

}
module.exports = new UserController;