const express = require('express');
const router = express.Router();
const hotelsController = require('../controllers/hotelsController');

// CREATE
router.post('/', hotelsController.createHotel);
// UPDATE
router.put('/:id', hotelsController.updateHotel);
// DELETE
router.delete('/:id', hotelsController.deleteHotel);
// GET
router.get('/:id', hotelsController.getHotel);
// GET ALL
router.get('/', hotelsController.getHotels);

module.exports = router;