// server.js

// set up ======================================================================
// get all the tools we need
let express  = require('express');
let session  = require('express-session');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let app = express();
let port = process.env.PORT || 3000;

let passport = require('passport');
let flash = require('connect-flash');

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration



// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
	secret: 'My Pizza Pizza!!!', // Random string for generating the hash value
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./routes/api-routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

let routes = require("./controllers/pizza_controller.js");
app.use(routes);

// Starts sever listening on PORT
app.listen(port, () => {
	console.log(`The pizza recipe app is listening on PORT: ${port}`);
});
