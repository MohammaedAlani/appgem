const jwt = require('jsonwebtoken');
const multer = require('multer');

module.exports = (req, res , next)=>{
    try{
    const token   = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token , 'MyfamilyYounis');
    res.datauser  = decoded;
    next();    
    }
    catch (error){
        return res.status(401).json({
            message : 'Auth faild'
        });
    }
   
};