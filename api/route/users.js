const express        = require('express');
const checkAuth      = require('../middleware/check-auth');
const userController = require('../controller/user');
const multer         = require('multer');
const router         = express.Router();

const storage = multer.diskStorage({
    destination : function (req , file , cb) {
      cb(null, './uploadsimageprofile/');  
    },
    filename : function (req , file , cb) {
     cb(null, new Date().toISOString() + file.originalname);   
    }
});

const fileFilter = (req, file, cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true) 
    } else {
        cb(null, false)
    } 
}; 
 
const upload = multer({
    storage : storage,
    fileFilter : fileFilter
});



//singup router

router.post('/singup',upload.single('profImg'), userController.user_singup);

//login route

router.post('/login', userController.user_login);

//delete account

router.delete('/:userId', checkAuth ,userController.user_delete);

//show profile

router.get('/userpage/:id', checkAuth,userController.user_get_profile);



module.exports = router;