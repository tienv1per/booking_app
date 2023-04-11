const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
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
    const { minPrice, maxPrice, ...others } = req.query;
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: {$gt: minPrice  || 1, $lt: maxPrice || 999}
        }).limit(10);

        return res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
}

module.exports.countByCity = async(req, res, next) => {
    const cities = req.query.cities.split(',');
    try {
        const listHotel = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({city: city});
            })
        );
    res.status(200).json(listHotel);
    } catch (error) {
        next(error);
    }
}

module.exports.countByType = async(req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({type: 'hotels'});
        const apartmentCount = await Hotel.countDocuments({type: 'apartments'});
        const resortCount = await Hotel.countDocuments({type: 'resorts'});
        const villaCount = await Hotel.countDocuments({type: 'villas'});
        const cabinCount = await Hotel.countDocuments({type: 'cabins'});
    res.status(200).json([
        { type: "hotels", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount }
    ]);
    } catch (error) {
        next(error);
    }
}

module.exports.getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId);
        const listRoom = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room);
        }));
        return res.json(listRoom);
    } catch (error) {
        next(error);
    }
}