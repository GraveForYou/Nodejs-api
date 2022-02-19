const jwt = require("jsonwebtoken");
const User = require('../models/User');

const verifyToken = async(req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const data = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(data.id);
        console.log("req.user:", req.user)
        next();

        // , (err, user) => {
        //     if (err) res.status(401).json({ err, message: "Unauthorized Access - No Token Provided!" });
        //     console.log(user);
        //     req.user = user;
        //     console.log(req.user);
        //     req.token = token;
        //     next();
        // }
    } else {
        return res.status(401).json({
            success: false,
            message: "You are not authenticated!"
        });
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next();
        } else {
            res.status(401).json({
                success: false,
                message: "You are not alowed to do that! Please login!",
            });
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(401).json({
                success: false,
                message: "You are not alowed to do that! You must be Admin!",
            });
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
};