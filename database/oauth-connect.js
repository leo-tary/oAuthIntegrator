const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.connect(`mongodb://${keys.mongoUser}:${keys.mongoPass}${keys.mongoURI}${keys.mongoDB}` , { useNewUrlParser: true })
        .then((connect) => {
            console.log('Connected to mongodb...');
        })
        .catch((err) => {
            console.log("Error connecting mongodb...",err);
        })

module.exports = mongoose;