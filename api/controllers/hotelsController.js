const Hotel = require('../models/Hotel');
const createError = require('../utils/error');

module.exports.createHotel = async(req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.updateHotel = async(req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.deleteHotel = async(req, res) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id, 
        );
    res.status(200).json("DELETE SUCCESSFULLY");
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getHotel = async(req, res) => {
    try {
        const hotel = await Hotel.findById(
            req.params.id, 
        );
    res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getHotels = async(req, res, next) => {
    // const failed = true;
    // if(failed) {
    //     return next(createError(401, "You are not authenticated"));
    // }
    try {
        const hotels = await Hotel.find();
    res.status(200).json(hotels);
    } catch (error) {
        // res.status(500).json(error);
        next(error);
    }
}