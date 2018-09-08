const express = require('express');
const router = express.Router();


router.get('/me' , (req , res) => {

    res.send(req.user);         // passport automatically attaches user property to request Object

})


router.get('/logout' , (req , res) => {
    req.logout();
    res.send(req.user);
})

module.exports = router;
