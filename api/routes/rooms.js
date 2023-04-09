const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');
const verify = require('../utils/verify');

// CREATE
router.post('/:hotelid', verify.verifyAdmin, roomsController.createRoom);
// UPDATE
router.put('/:id', verify.verifyAdmin, roomsController.updateRoom);
// DELETE
router.delete('/:id/:hotelid', verify.verifyAdmin, roomsController.deleteRoom);
// GET
router.get('/:id', verify.verifyAdmin, roomsController.getRoom);
// GET ALL
router.get('/', verify.verifyAdmin, roomsController.getRooms);

module.exports = router;