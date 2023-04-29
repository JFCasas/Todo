var express = require("express")

var User = require('../models/User.js')

var router = express.Router()

//Crear Usuario

router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }).then((doc) => {
        res.redirect('/')
        //res.json(doc)
        //console.log(doc)
    }).catch((err) => {
        console.log(err)
    })
})




module.exports = router;