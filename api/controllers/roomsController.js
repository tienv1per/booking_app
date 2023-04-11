const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const createError = require('../utils/error');

module.exports.createRoom = async(req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: {rooms: savedRoom._id}
            })
        } catch (error) {
            next(error);
        }
        return res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
}

module.exports.updateRoom = async(req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.updateAvailableRoom = async(req, res) => {
    try {
        await Room.updateOne({"roomNumbers._id": req.params.id }, {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        });
        res.status(200).json("Room status has been updated.");
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.deleteRoom = async(req, res) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(
            req.params.id, 
        );
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: {rooms: req.params.id}
            })
        } catch (error) {
            next(error);
        }
    res.status(200).json("DELETE SUCCESSFULLY");
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getRoom = async(req, res) => {
    try {
        const hotel = await Room.findById(
            req.params.id, 
        );
    res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getRooms = async(req, res, next) => {
    try {
        const hotels = await Room.find();
    res.status(200).json(hotels);
    } catch (error) {
        // res.status(500).json(error);
        next(error);
    }
}