//importing moongose module for mongodb
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

//declaring the Payment schema with feilds
const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required : true
    },
    password: {
        type : String,
        required:true

    },
    userId: {
        type : Number,
        required:true

    },
    userType: {
        type : String,
        required:true

    }
})

module.exports = mongoose.model('Users', UserSchema);