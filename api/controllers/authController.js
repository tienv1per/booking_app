const User = require('../models/User');
const createError = require('../utils/error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports.register = async(req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            password: hashedPassword,
        })

        await newUser.save();
        return res.status(200).send("User created successfully");
    } catch (error) {
        next(error);
    }
}

module.exports.login = async(req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if(!user) return next(createError(404, "User not found"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordCorrect) return next(createError(400, "Password incorrect"));

        const {password, isAdmin, ...otherDetails} = user._doc;
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, JWT_SECRET_KEY);
        return res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json({details: {otherDetails}, isAdmin});
    } catch (error) {
        next(error);
    }
}