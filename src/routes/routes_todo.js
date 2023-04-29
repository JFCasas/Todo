var express = require("express")

var Todo = require('../models/Todo.js')

var router = express.Router()

//Recuperar todas las tareas

router.get('/', (req, res) => {

    Todo.find()

        .then((docs) => {

            res.render('index.ejs', {tareas: docs, user: req.session.name})

        }).catch((err) => {

            console.log(err)
            res.json(err)
        })
})

//Recuperar una tarea

router.get('/:id', (req, res) => {

    Todo.findById(req.params.id)

        .then((doc) => {

            res.send(doc)

        }).catch((err) => {

            console.log(err)
            res.json(err)
        })
})

//Añadir una tarea

router.post('/', (req, res) => {

    Todo.create({
        title: req.body.title,
        description: req.body.description

    }).then((doc) => {

        res.redirect('/todo')
        console.log(doc)

    }).catch((err) => {

        console.log(err)

    })

})

//Modificar una tarea

//Primero mandamos a la página donde va a estar el formulario para llevar a cabo la modificación

//Le mandamos el id para que sea capaz de saber el registro que tiene que modificar

router.get('/edit/:id', (req, res) => {

    let id = req.params.id

    res.render('edit.ejs', {id: id, user: req.session.name })
    

})

//Una vez cargada la página edit.js que lleva un formulario y que ha recibido la variable id

//La gracia está que el action de este formulario se construye 

//<form action="/edit/<%= id%>" method="POST" class="col s12">

router.post('/edit/:id',function(req,res){

    let tareaData = {};

    if (req.body.title) {tareaData["title"] = req.body.title }
    if (req.body.description) {tareaData["description"] = req.body.description }
    
    
    Todo.findByIdAndUpdate(req.params.id,tareaData,{new:true})

    //   .then((updatedDoc) => res.json(updatedDoc))
      .then((updatedDoc) => res.redirect('/todo'))
      
      .catch((err)=>{

			console.log(err)
			res.json(err)
	  })
    
});

//Eliminar una tarea

router.get('/delete/:id',(req,res)=>{

    Todo.findByIdAndRemove(req.params.id)

        .then(() => res.redirect('/todo'))
        .catch((err)=>{

			console.log(err)
			res.json(err)
	    })
});
module.exports = router;