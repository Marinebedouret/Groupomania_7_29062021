const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

router.get('/',likeCtrl.getAllLikes);
router.post('/', likeCtrl.createLike);

module.exports = router;