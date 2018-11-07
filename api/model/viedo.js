const mongoose = require('mongoose');
const videoSchema = mongoose.Schema({
    author    : { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    fans      : [{type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    video     : [String] ,
});
//code bu Mohammed Younis Alani email yaldez.1991@gmail.com
//code bu Mohammed Younis Alani email yaldez.1991@gmail.com
//code bu Mohammed Younis Alani email yaldez.1991@gmail.com
module.exports = mongoose.model('Viedoes',videoSchema);