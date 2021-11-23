const express = require('express');
const router = express.Router();

//routes controllers + middleware
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

//Route 
router.post('/signup',userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/',auth, userCtrl.getAllUser);
router.get('/:id',auth,userCtrl.getOneUser);
router.put('/:id', auth,userCtrl.modifyUser);
router.put('/:id/picture');
router.delete('/delete/:id', auth, userCtrl.deleteUser);



module.exports = router;