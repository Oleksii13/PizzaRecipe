// app/routes.js
const pizza = require('../models/pizza.js');
module.exports = function (app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function (req, res) {
		pizza.selectAll(function (data) {

			if (data.length != 0) {
				for (var i = 0; i < data.length; i++) {

					data[i].ingredients = JSON.parse(data[i].ingredients);
				}
				res.locals.allRecipes = data;
				res.render('index.ejs')

			} else {

				res.locals.allRecipes = data;
				res.render('index.ejs')


			};

			// res.locals.allRecipes = data; res.render('index.ejs');
		});
	});


	// =========================

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function (req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
			successRedirect: '/recipe', // redirect to the secure profile section
			failureRedirect: '/login', // redirect back to the signup page if there is an error
			failureFlash: true // allow flash messages
		}),
		function (req, res) {
			console.log("hello");

			if (req.body.remember) {
				req.session.cookie.maxAge = 1000 * 60 * 2;
			} else {
				req.session.cookie.expires = false;
			}
			res.redirect('/');
		});

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function (req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', {
			message: req.flash('signupMessage')
		});
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/recipe', // redirect to the secure profile section
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));

	// =====================================
	// My Recipe SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/recipe', isLoggedIn, function (req, res) {
		let userId = req.user.id;

		pizza.selectUser(userId, function (data) {
			if (data.length != 0) {
				for (var i = 0; i < data.length; i++) {

					data[i].ingredients = JSON.parse(data[i].ingredients);
				}

				console.log("inside " + data);
				let obj = {
					userRecipes: data,
					user: req.user
				};

				res.render('recipe.ejs', obj)
			} else {
				let obj = {
					userRecipes: data,
					user: req.user
				};

				res.render('recipe.ejs', obj)
			}


			// var some = JSON.parse(data.ingredients);
			// data.ingredients = some;
			// console.log(data.ingredients);


		})
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}