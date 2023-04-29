var express = require("express")

var Todo = require('../models/Todo.js')

var router = express.Router()

router.get('/', (req, res) => res.render('main.ejs', {user: req.session.name}))
router.get('/about', (req, res) => res.render('about.ejs', {user: req.session.name}))
router.get('/contact', (req, res) => res.render('contact.ejs', {user: req.session.name}))
// router.get('/edit/:id', (req, res) => res.render('edit.ejs'))

module.exports = router;