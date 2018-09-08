const express = require('express');
const cookie = require('cookie-session');   // As express does not have any idea how to handle cookies
const passport = require('passport');

require('./services/passport');
const authRouting = require('./routes/auth');
const user = require('./routes/user');
const keys = require('./config/keys');

const app = express();
// authRouting(app);

// Middlewares are the functions used to modify incoming requests to our app before they are sent to route handlers.

/**
 * 
 *  Below middleware does extracts cookie data which is stored while serializing the user Object and eventually
 *  assigns to req.session property. You can verify the data (stored during serialization) by using res.send(req.session)
 *  
 *  cookie-session stores all the data directly in cookie; express-session stores the session id in the cookie and
 *  the actual data (related to session id) is stored in session store (think it as another location).
 * 
 *  Client / Browser always include / sends "Cookie" in any request made to server. This "Cookie" is sent as 
 *  Request Header  (Cookie). Also, sometimes we don't end up seeing Cookie in Response Headers and reason is 
 *  because during those requests, we may not be updating / deleting any cookie data; If we are only reading the 
 *  cookie data, server side may not include the "Cookie as Response Header" for subsequent requests / responses.
 *  
 */

app.use(cookie({            
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]          // array for additional security 
}));

// Letting passport know to use cookies
app.use(passport.initialize());     
app.use(passport.session());

app.use('/auth/google' , authRouting);
app.use('/api' , user);

const PORT = process.env.PORT || 2900;

app.listen(PORT, () => {
    console.log(`oAuth Integrator triggered @${PORT}`);
})
