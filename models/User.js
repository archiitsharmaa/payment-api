const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required : true
    },
    password: {
        type : String,
        required:true

    }
})

module.exports = mongoose.model('Users', UserSchema);