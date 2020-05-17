// set up ======================================================================
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const app = express()
const exphbs  = require('express-handlebars');
const authService = require("./auth/authService.js")
const apiRoutes = require("./routes/api")
const pageRoutes = require("./routes/pages")

// template engine =============================================================
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  extname: '.handlebars',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, "views/partials"),
  helpers: {
  	ifEquals: function (arg1, arg2) { return ( arg1 == arg2); },
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "views"));


// state =======================================================================
global.serviceContextToken

// configuration ===============================================================
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// routes ======================================================================
app.use(apiRoutes)
app.use(pageRoutes)

// start listening =============================================================
app.listen(process.env.PORT || 8080, function () {
  app.emit("listening", null)
})

// run once at start ===========================================================
app.on("listening", function () {
  authService().then((response) => {
    global.serviceContextToken = response
    console.log(global.serviceContextToken.access_token)  
  })
})
