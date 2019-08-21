var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root Route
router.get("/", function(req, res){
	res.render("landing");
});

// ====================
// AUTHORIZATION ROUTES
// ====================

// Show register form
router.get("/register", function(req, res){
	res.render("register");
});

// Handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome, " + user.username + ". We hope you enjoy DreamCamp!");
			res.redirect("/campgrounds");
		});
	});
});

// Show Login Form
router.get("/login", function(req, res){
	res.render("login");
});

// Handle Login Logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds", 
		failureRedirect: "/login"
	}), function(req, res){
});

// Logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You've been successfully logged out");
	res.redirect("/campgrounds");
});

module.exports = router;