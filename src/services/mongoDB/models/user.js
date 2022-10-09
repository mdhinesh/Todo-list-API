const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required:true
    },
    password: String,
})


module.exports.User = mongoose.model("User", userschema);