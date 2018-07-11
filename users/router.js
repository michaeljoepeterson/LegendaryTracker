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

function organizeScores(scoreArray,filter){
	return scoreArray.sort(function(a,b){
		return b[filter] - a[filter];
	});
}
//check functionality for max case
function compareScores(scoreArray,highScoreArray,filterType){
	//filtertype should be pointsPerTurn, totalScore, 
	
	let finalHighScores = highScoreArray.slice();
	
	if (highScoreArray.length === 0){
		finalHighScores.push(scoreArray);
		
		return finalHighScores;
	}
	else{
		for (let i = 0;i < highScoreArray.length;i++){
			
			if(scoreArray[filterType] >= highScoreArray[i][filterType]){
				console.log(highScoreArray[i][filterType]);
				finalHighScores.push(scoreArray);
				//console.log("added item");
				break;
			}
			
			if(highScoreArray.length < 10 && i === (highScoreArray.length - 1)){
				//console.log("added item other case");
				finalHighScores.push(scoreArray);
			}
			
		}
		
	}
	
	finalHighScores = organizeScores(finalHighScores,filterType);
	if(finalHighScores.length > 10){
		finalHighScores.pop();
	}
	//console.log("finished adding");
	return finalHighScores;
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

	const legalChars = /^[a-zA-z0-9\{\}\<\>\[\]\+\*.,?!;\s']*$/;
	const checkCharsScore = Object.keys(score).find(key =>{
		const check = legalChars.test(score[key]);
		if(!check){
			return score[key];
		}
	});

	const checkChars = legalChars.test(username);
	
	if (!checkChars || checkCharsScore){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Illegal Character",
			location: checkChars
		});
	}
	//need score id to track scores
	//need to find the user and return the scores so that can append score
	return User.find({"username":username})

	.then(user => {
		let data = user[0].scores;
		let totalHighScore = user[0].highScores;
		let pptHighScore = user[0].highScoresPpt;
		let newTotalHighScore;
		let newPptHighScore;
		//console.log(data.length);
		const pointsPerTurn = score.victoryPoints / score.numTurns;
		const totalScore = score.victoryPoints - (4 * score.numBystanders) - (3 * score.numSchemes) - (score.numVillains);
		score.pointsPerTurn = pointsPerTurn;
		score.totalScore = totalScore;
		
		let winCount = 0;
		if (score.win === "y"){
			winCount++;
			newTotalHighScore = compareScores(score,totalHighScore,"totalScore");
			newPptHighScore = compareScores(score,pptHighScore,"pointsPerTurn");
		}
		else{
			newTotalHighScore = totalHighScore;
			newPptHighScore = pptHighScore;
		}
		let maxId = 0;
		for (let i = 0; i < data.length; i++){
			if(data[i].id > maxId){
				maxId = data[i].id
			}
		}
		score.id = maxId + 1;
		data.push(score);
		console.log(score);
		return User.findOneAndUpdate({"username":username}, {$set:{scores:data,highScores:newTotalHighScore,highScoresPpt:newPptHighScore}, $inc:{wins:winCount,matches:1}})
	})

	.then(user =>{
		
		return res.json({message:"success"});
	})
	.catch(err => {
		//console.log(err);
		return res.json({"err":err});
	});
});

router.get("/highScore", jwtAuth,jsonParser,(req,res) =>{
	
	let username =  req.query.username;
	console.log(username);
	for (let key in req.query){
		if(key === "username"){
			continue;
		}
		else{
			return res.json({code:500, message:"an error occured"});
		}
		
	}

	const legalChars = /^[a-zA-z0-9\{\}\<\>\[\]\+\*.,?!;\s']*$/;

	const checkChars = legalChars.test(username);
	
	if (!checkChars){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Illegal Character",
			location: checkChars
		});
	}

	return User.find({"username":username})

	.then(user => {
		//console.log(user);
		//console.log(user[0].highScores);
		return res.json({
			highScores:user[0].highScores,
			highScoresPpt:user[0].highScoresPpt
		});
	})
	.catch(err => {
		//console.log(err);
		return res.json({"err":err});
	});

});

module.exports = {router};
