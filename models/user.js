const mongoose = require('../database/oauth-connect');

const userSchema = new mongoose.Schema({

    googleId:{
        required: true,
        type: String
    }
})


const User = mongoose.model('users' , userSchema);

module.exports = {
    userSchema , 
    User
}