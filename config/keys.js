
/**
 * 
 *  We could have also done:-
 *  const express = require('express');     // this'll only pick the required module from memory (NODE_MODULES_CACHE=true) instead of loading it from scratch
 *  const app = express();
 * 
 *  const environment = app.get('env)       // this'll return development or production if deployed on production servers
 * 
 */

const environment = process.env.NODE_ENV;
let keys;


if(environment === 'development'){

    keys = require('./development');

}else if(environment === 'testing'){        // SET Enviornment Variable NODE_ENV=testing

    keys = require('./testing');

}else{
    
    keys = require('./production');

}

module.exports = keys;