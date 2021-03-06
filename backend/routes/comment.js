const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');


router.post('/:id', auth,commentCtrl.createComment);
router.delete('/delete/:id', auth,commentCtrl.deleteComment);
router.get('/:id', auth, commentCtrl.getAllComment);
router.put('/:id', auth, commentCtrl.modifyComment )

module.exports = router