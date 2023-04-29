var express = require("express")

var User = require('../models/User.js')

var router = express.Router()

//Recuperar usuarios

//Recuperar todas las tareas

router.get('/', (req, res) => {

    User.find()

        .then((docs) => {

            res.render('user.ejs', {users: docs, user: req.session.name})

        }).catch((err) => {

            console.log(err)
            res.json(err)
        })
})

//Crear Usuario

router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }).then((doc) => {
        res.redirect('/user')
        //res.json(doc)
        //console.log(doc)
    }).catch((err) => {
        console.log(err)
    })
})

//Eliminar un usuario

router.get('/delete/:id',(req,res)=>{

    User.findByIdAndRemove(req.params.id)

        .then(() => res.redirect('/user'))
        .catch((err)=>{

			console.log(err)
			res.json(err)
	    })
});


module.exports = router;