const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');

router.post('/create',auth,multer, postCtrl.createdPost);
router.get('/',auth,postCtrl.getAllPosts);
router.get('/:id',auth,postCtrl.getOnePost);
router.delete('/delete/:id',auth,postCtrl.deletePost);
router.put('/:id', auth, postCtrl.modifyPost);


module.exports = router;