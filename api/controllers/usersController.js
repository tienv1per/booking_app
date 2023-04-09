const User = require('../models/User');
const createError = require('../utils/error');


module.exports.updateUser = async(req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(
            req.params.id, 
        );
    res.status(200).json("DELETE SUCCESSFULLY");
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getUser = async(req, res) => {
    try {
        const user = await User.findById(
            req.params.id, 
        );
    res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getUsers = async(req, res, next) => {
    try {
        const users = await User.find();
    res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
        //next(error);
    }
}