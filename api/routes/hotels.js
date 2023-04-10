const express = require('express');
const router = express.Router();
const hotelsController = require('../controllers/hotelsController');
const verify = require('../utils/verify');

// CREATE
router.post('/', verify.verifyAdmin, hotelsController.createHotel);
// UPDATE
router.put('/:id', verify.verifyAdmin, hotelsController.updateHotel);
// DELETE
router.delete('/:id', verify.verifyAdmin, hotelsController.deleteHotel);
// GET
router.get('/find/:id', verify.verifyAdmin, hotelsController.getHotel);
// GET ALL
router.get('/', verify.verifyAdmin, hotelsController.getHotels);

router.get('/countByCity', hotelsController.countByCity);

router.get('/countByType', hotelsController.countByType);

module.exports = router;