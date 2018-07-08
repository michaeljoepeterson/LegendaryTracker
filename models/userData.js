'use strict';
//need to add wins and total matches
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	scores: {type: Array},
	wins: {type:Number, default:0},
	matches: {type:Number, default:0},
	highScores: {type:Array},
	highScoresPpt: {type:Array}
});

userSchema.methods.serialize = function(){
	return{
		username: this.username || '',
	}
}

userSchema.methods.validatePassword = function(password){
	return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
 	 return bcrypt.hash(password, 10);
};

const User = mongoose.model("User",userSchema);

module.exports = {User};