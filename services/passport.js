const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');
const {User , userSchema} = require('../models/user');
/**
 * 
 *  1) Creates new instance of google passport strategy - basically authenticating application users with google.
 *  2) passport.use basically letting passport know that "You might be aware of baaic oAuth flow, but here we are
 *      registering Google Strategy to authenticate this application's users with google".
 * 
 */
 

passport.serializeUser((user , done) => {
    done(null , user._id);
})

passport.deserializeUser((_id , done) => {
    User.findById(_id)
        .then((user) => {
            done(null , user);
        })
        .catch((err) => {
            console.log("Error finding user..." , err);
        })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: keys.googleCallbackURI,
    proxy: true

} , (accessToken , refreshToken , profile , done) => {

    User.findOne({ "googleId": profile.id })
        .then((userFound) => {

            if (!userFound) {

                new User({
                    googleId: profile.id
                })
                    .save()
                    .then((user) => {
                        // console.log("Created " , user);
                        done(null , user);
                    });

            } else {
                
                // console.log("Found " , userFound);
                done(null , userFound);

            }
        })
        .catch((err) => {
            console.log(err);
        });


    // const user = await User.findOne({"googleId":profile.id} , {"_id":0 , "googleId":1})
    // console.log(user);

}));