'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	scores: {type: Array}
});

userSchema.methods.serialize = function(){
	return{
		username: this.username || ''
	}
}

userSchema.methods.validatePassword = function(password){
	return bcrypt.compare(password, 10);
};

userSchema.statics.hashPassword = function(password) {
 	 return bcrypt.hash(password, 10);
};

const User = mongoose.model("User",userSchema);

module.exports = {User};