const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
    _id       : mongoose.Schema.Types.ObjectId,
    firstname : {type : String, required : true},
    lastname  : {type : String, required : true},
    email     : {type : String, required : true, unique: true},
    phone     : {type : Number, required : true, unique: true},
    password  : {type : String, required : true},
    gender    : {type : String, required : true}, 
    joinedOn  : {type : Date  ,  default  : new Date()},
    birthday  : {type : String, required : true},
    notftime  : [String],
    profImg   : {type : String , required : true},
    stories   : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Viedoes' }]
});
//code bu Mohammed Younis Alani email yaldez.1991@gmail.com
//code bu Mohammed Younis Alani email yaldez.1991@gmail.com
//code bu Mohammed Younis Alani email yaldez.1991@gmail.com
module.exports = mongoose.model('Users',usersSchema);