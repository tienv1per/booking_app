const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const verify = require('../utils/verify');

// verify user: middlware check xem user da dc authen chua, neu thanh cong thi thuc hien callback
// UPDATE
router.put('/:id', verify.verifyUser, userController.updateUser);
// DELETE
router.delete('/:id', verify.verifyUser, userController.deleteUser);
// GET
router.get('/:id', verify.verifyUser, userController.getUser);
// GET ALL
router.get('/', verify.verifyAdmin, userController.getUsers);

module.exports = router;