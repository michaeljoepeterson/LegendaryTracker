const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const { publicKey,privateKey } = require('../config');
const jwt = require('jsonwebtoken');
const router = express.Router();
const request = require('request');
const jsonParser = bodyParser.json();
const {MD5} = require('./md5Function');

const jwtAuth = passport.authenticate('jwt', { session: false });
router.use(jwtAuth);
/*
router.get("/key",jwtAuth,(req,res) =>{
	
	return res.json({
			publickey:publicKey,
			privatekey: privateKey
		});

});
*/
router.get("/",(req,res) =>{
	
	let timeStamp =  req.query.timeStamp;
	let m5Hash = MD5(timeStamp + privateKey+publicKey);
	console.log(timeStamp)
	console.log(m5Hash);
	let character = req.query.character;
	let endUrl = "http://gateway.marvel.com/v1/public/characters?ts=" + timeStamp + "&apikey=" + publicKey + "&hash=" + m5Hash + "&name=" + character; 

	const legalChars = /^[a-zA-z0-9\{\}\<\>\[\]\+\*.,?!;\s-']*$/;

	const checkChars = legalChars.test(timeStamp);
	const checkChars2 = legalChars.test(character); 
	
	if (!checkChars || !checkChars2){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Illegal Character",
			location: checkChars
		});
	}
	request(endUrl,function(err,response,body){
		console.log("got a result");
		try{
			let parsed = JSON.parse(body);

	        if(parsed.data.results.length === 0){
	        	return res.json({
					error:"No results"
				});
	        }
	        else{
	        	return res.json({
					path:parsed.data.results[0].thumbnail.path,
					extension:parsed.data.results[0].thumbnail.extension
				});
	        }
		}
		catch(err){
			console.log("error getting image: ",err);
			return res.json({
				code:400,
				Message:"Error getting image"
			});
		}      
	});

});
module.exports = {router};