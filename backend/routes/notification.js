const express = require('express');
const router = express.Router();

const notificationCtrl = require('../controllers/notification');
const auth = require('../middleware/auth');

router.get('/', auth);
router.delete('/', auth);
router.delete('/:id', auth);

module.exports = router;