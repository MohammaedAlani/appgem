const express        = require('express');
const checkAuth      = require('../middleware/check-auth');
const videoController = require('../controller/video');
const multer         = require('multer');
const router         = express.Router();

const storage = multer.diskStorage({
    destination : function (req , file , cb) {
      cb(null, './uploadvideo/');  
    },
    filename : function (req , file , cb) {
     cb(null, new Date().toISOString() + file.originalname);   
    }
});

const fileFilter = (req, file, cb)=>{
    if (file.mimetype === 'video/mp4' || file.mimetype === 'image/png') {
        cb(null, true) 
    } else {
        cb(null, false)
    } 
}; 
 
const upload = multer({
    storage : storage,
    fileFilter : fileFilter
});



router.post('/:id', checkAuth ,  upload.single('video') , videoController.video_get_video);


module.exports = router;