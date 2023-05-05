var express = require("express");
var ejs = require("ejs")
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var session = require('express-session')

require('dotenv').config()

//mongoose.connect('mongodb://localhost:27017/todo')

/* mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME
      //user: process.env.DB_USER,
      //pass: process.env.DB_PASS,
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      //useFindAndModify: false
    }) */

// Initialize DB

require('./initDB/initDB')();

var session_middleware = require("./middlewares/session");

var router_home = require("./routes/routes.js")
var router_todo = require("./routes/routes_todo.js")
var router_user = require("./routes/routes_user.js")
var router_session = require("./routes/routes_session.js")

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(morgan('dev'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next(); 
});

app.use("/todo",session_middleware);



app.use("/", router_home)
app.use("/todo", router_todo)
app.use("/user", router_user)
app.use("/session", router_session)

app.use(express.static(path.join(__dirname, '/public')))
//app.use(express.static('public'));

app.listen(3000)

console.log("Server is listening on port 3000")

