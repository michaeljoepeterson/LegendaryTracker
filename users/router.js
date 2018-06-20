'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {User} = require('../models/userData');

const router = express.Router();

const jsonParser = bodyParser.json();

module.exports = {router};

router.post('/',jsonParser,(req,res) => {
	const requiredFields = ['username','password'];
	const missingField = requiredFields.find(field => !(field in req.body));
	if(missingField){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Missing Field",
			location:missingField
		});
	}
	//need to add other checks such as length, trim, check for string, check for illegal chars
	let {username, password} = req.body;
	return User.find({username}).count()
	.then(count => {
		if (count > 0){
			return Promise.reject({
				code:422,
				reason:"ValidationError",
				message:"Username taken",
				location:'username'
			});
		}
		return User.hashPassword(password);
	})
	.then(hash => {
		return User.create({
			username,
			password: hash
		});
	})
	.then(user =>{
		return res.status(201).json(user.serialize());
	})
	.catch(err => {
		if(err.reason === 'ValidationError'){
			return res.status(err.code).json(err);
		}
		res.status(500).json({code:500, message:'internal server error'});
	});
});