var express = require("express")

var User = require('../models/User.js')

var router = express.Router()

//Página de login

router.get('/login', (req, res) => res.render('login.ejs', {variable1: ''}))

//Realizar login en la aplicación

router.post('/login', (req, res) => {
    User.findOne({email:req.body.email})
    .then((user)=>{
        console.log(user)
        user.verifyPassword(req.body.password)
            .then((valid)=>{
                if(valid){
                    //Fijamos el parámetro de la sesión
                    const sess = req.session;
                    sess._id = user._id
                    sess.name = user.name
                    console.log(sess)
                    console.log("El usuario es valido")
                    res.redirect('/todo')
                
                }else{
                    console.log("El usuario no es valido")
                    res.render('login.ejs', {variable1: 'Error'})
                    //res.redirect('/session/login')
                    //res.render('login.ejs')
                    //next(new Error('Invalid credentials'))
                }
            })
    }).catch((error)=>{
        console.log(error)
        //res.redirect('/session/login', {variable1: 'Variable1'})
        res.render('login.ejs', {variable1: 'Error'})
    })
})



//logout
router.get('/logout', function (req, res, next) {
    // logout logic
  
    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session._id = null
    console.log(req.session)
    req.session.save(function (err) {
      if (err) next(err)
  
      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) next(err)
        res.redirect('/')
      })
    })
  })




module.exports = router;