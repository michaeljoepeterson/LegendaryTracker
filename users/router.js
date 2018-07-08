'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {User} = require('../models/userData');
const jwt = require('jsonwebtoken');
const router = express.Router();

const jsonParser = bodyParser.json();



router.post('/',jsonParser,(req,res) => {
	//check for illegal characters
	const legalChars = /^[a-zA-z0-9\{\}\<\>\[\]\+\*.,?!;\s']*$/;
	//const checkChars = legalChars.test(req.body);
	const checkChars = Object.keys(req.body).find(key =>{
		const check = legalChars.test(req.body[key]);
		if(!check){
			return req.body[key];
		}
	});
	//console.log(checkChars);
	if (checkChars){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Illegal Character",
			location: checkChars
		});
	}

	const requestFields = Object.keys(req.body).length;
	//check for the number of fields in the request object
	if (requestFields > 2){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Extra Field"
		});
	}
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
	//make sure the fields are strings
	const stringFields = ['username', 'password'];
	const nonStringField = stringFields.find(field => field in req.body && typeof req.body[field] !== 'string');

	if (nonStringField){
		return res.status(422).json({
	      code: 422,
	      reason: 'ValidationError',
	      message: 'Incorrect field type: expected string',
	      location: nonStringField
    	});
	}
	// check if the fields have spaces at beginning or end
	const explicityTrimmedFields = ['username', 'password'];
  	const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  	);

  	if (nonTrimmedField) {
	    return res.status(422).json({
	      code: 422,
	      reason: 'ValidationError',
	      message: 'Cannot start or end with whitespace',
	      location: nonTrimmedField
	    });
  }
  //check the length of the fields
  const sizedFields = {
    username: {
      min: 1,
      max: 50
    },
    password: {
      min: 10,
      max: 72
    }
  };
   const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }
	
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

const jwtAuth = passport.authenticate('jwt', { session: false });

function compareScores(scoreArray,highScoreArray,filterType){
	//need to look through, sort and add if score is high
	//could I make this function work for all ways I want to filter?
	//check the type of filterType
	//if its num should be filtered by ppt or total
	//otherwise its one of other choices
	//use this function in a get request as well
	let finalHighScores = highScoreArray;
	console.log("sort arrays");
	if (finalHighScores.length === 0){
		finalHighScores.push(scoreArray[0])
		return finalHighScores
	}
}

router.put("/addscore", jwtAuth,jsonParser,(req,res) => {
	//res.json({message:"success"});
	let {username,score} =  req.body;

	for (let key in req.body){
		if(key === "username" || key === "score"){
			continue;
		}
		else{
			return res.json({code:500, message:"an error occured"});
		}
		
	}
	//need score id to track scores
	//need to find the user and return the scores so that can append score
	return User.find({"username":username})

	.then(user => {
		let data = user[0].scores;
		//console.log(data.length);
		const pointsPerTurn = score.victoryPoints / score.numTurns;
		const totalScore = score.victoryPoints - (4 * score.numBystanders) - (3 * score.numSchemes) - (score.numVillains);
		score.pointsPerTurn = pointsPerTurn;
		score.totalScore = totalScore;
		compareScores([],[]);
		let winCount = 0;
		if (score.win === "y"){
			winCount++;
		}
		let maxId = 0;
		for (let i = 0; i < data.length; i++){
			if(data[i].id > maxId){
				maxId = data[i].id
			}
		}
		score.id = maxId + 1;
		data.push(score);
		//console.log(score);
		return User.findOneAndUpdate({"username":username}, {$set:{scores:data}, $inc:{wins:winCount,matches:1}})
	})

	.then(user =>{
		//console.log(user);
		return res.json({message:"success"});
	})
	.catch(err => {
		//console.log(err);
		return res.json({"err":err});
	});
});

module.exports = {router};
