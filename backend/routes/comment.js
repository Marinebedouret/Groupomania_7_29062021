const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');


router.post('/:id', auth,commentCtrl.createComment);
router.delete('/delete/:id', auth,commentCtrl.deleteComment);
router.get('/', auth, commentCtrl.getAllComment);
router.get('/:id', auth, commentCtrl.getOneComment);
router.put('/:id', auth, commentCtrl.modifyComment )

module.exports = router