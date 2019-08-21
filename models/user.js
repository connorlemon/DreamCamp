var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema(
	{
	username: String,
	password: String
	});

//This adds passport methods to User
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);


