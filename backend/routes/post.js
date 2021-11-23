const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');

router.post('',auth,multer, postCtrl.createdPost);
router.get('',auth,postCtrl.getAllPosts);
router.delete('/delete/:id',auth,multer,postCtrl.deletePost);
router.put('/:id', auth,multer, postCtrl.modifyPost);


module.exports = router;