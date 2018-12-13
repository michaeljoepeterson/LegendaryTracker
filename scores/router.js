const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {User} = require('../models/userData');
const router = express.Router();
const jsonParser = bodyParser.json();

const jwtAuth = passport.authenticate('jwt', { session: false });
router.use(jwtAuth);
router.use(jsonParser);

function organizeScores(scoreArray,filter){
	return scoreArray.sort(function(a,b){
		return b[filter] - a[filter];
	});
}
function compareScores(scoreArray,highScoreArray,filterType){
	
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
				break;
			}
			
			if(highScoreArray.length < 10 && i === (highScoreArray.length - 1)){
				finalHighScores.push(scoreArray);
			}
			
		}
		
	}
	
	finalHighScores = organizeScores(finalHighScores,filterType);
	if(finalHighScores.length > 10){
		finalHighScores.pop();
	}
	return finalHighScores;
}

router.put("/addscore", jwtAuth,jsonParser,(req,res) => {
	let {username,score} =  req.body;
	
	for (let key in req.body){
		if(key === "username" || key === "score"){
			continue;
		}
		else{
			return res.json({code:500, message:"an error occured"});
		}
		
	}

	const legalChars = /^[a-zA-z0-9\{\}\<\>\[\]\+\*.,?!;\s-']*$/;
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
	return User.find({"username":username})

	.then(user => {
		let data = user[0].scores.slice();
		let totalHighScore = user[0].highScores.slice();
		let pptHighScore = user[0].highScoresPpt.slice();
		let newTotalHighScore;
		let newPptHighScore;
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
		return User.findOneAndUpdate({"username":username}, {$set:{scores:data,highScores:newTotalHighScore,highScoresPpt:newPptHighScore}, $inc:{wins:winCount,matches:1}})
	})

	.then(user =>{
		
		return res.json({message:"success"});
	})
	.catch(err => {
		return res.json({"err":err});
	});
});

router.get("/highScore", jwtAuth,(req,res) =>{
	
	let username =  req.query.username;
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
		
		return res.json({
			highScores:user[0].highScores,
			highScoresPpt:user[0].highScoresPpt
		});
	})
	.catch(err => {
		
		return res.json({"err":err});
	});

});

router.get("/stats",jwtAuth,(req,res) =>{
	let username =  req.query.username;
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
		let userTotal = user[0].scores.slice();
		let userPpt = user[0].scores.slice();
		let newTotalHighScore = organizeScores(userTotal,"totalScore");
		let newPptHighScore = organizeScores(userPpt,"pointsPerTurn");
		return res.json({
			scoresTotal:newTotalHighScore,
			scoresPpt:newPptHighScore,
			wins:user[0].wins,
			matches: user[0].matches
		});
	})
	.catch(err => {
		
		return res.json({"err":err});
	});
});

function findById(numId, objectArr){
	
	let newArr = objectArr.slice();
	let returnValues = {};
	let winVal = 0;
	for(let i = 0;i < newArr.length;i++){
		
		if(newArr[i].id == numId){
			if(newArr[i].win === "y"){
				
				winVal++;
			}
			
			returnValues.win = winVal;
			
			newArr.splice(i,1);
		}
		
	}
		
	returnValues.newArray = newArr;
	return returnValues;
}

function genIdArray(arr){
	let idArr = [];
	for (let i = 0;i < arr.length;i++){
		idArr.push(arr[i].id);
	}
	return idArr;
}

function updateHighScoresArrays(arr,arrHighScore,scoreType){
	console.log("update highscores ftn");
	const idArray = genIdArray(arrHighScore);
	console.log(idArray);
	let returnHighScores = arrHighScore.slice();
	console.log(returnHighScores.length);
	for(let i = 0; i < arr.length;i++){
		for(let k =0; k< arrHighScore.length;k++){
			console.log(i,k);
			console.log("ids", arr[i].id,arrHighScore[k].id )
			console.log(arr[i][scoreType] >= arrHighScore[k][scoreType] && arr[i].id !== arrHighScore[k].id && returnHighScores.length !== 10);
			if(idArray.includes(arr[i].id)){
				console.log("found in id array");
				break;
			}
			else if(arr[i].win === "n"){
				console.log("Not a win");
				break;
			}
			
			else if(arr[i][scoreType] >= arrHighScore[k][scoreType] && arr[i].id !== arrHighScore[k].id && returnHighScores.length !== 10){
				console.log("found item");
				console.log(arr[i]);
				returnHighScores.push(arr[i]);
				console.log(returnHighScores.length);
				break;
			}
			else if(k === (arrHighScore.length - 1) && arrHighScore.length < 10){
				console.log("last item in array");
				returnHighScores.push(arr[i]);
			}
			else{
				console.log("Just continuing");
				continue;
			}

		}
		if(returnHighScores.length === 10){
			console.log("stopping for loop");
			break;
		}
	}
	returnHighScores = organizeScores(returnHighScores,scoreType);
	console.log(returnHighScores.length);
	return returnHighScores;
}

router.delete("/deletescore", jwtAuth, jsonParser, (req,res)=> {
	let {username,scoreId} =  req.body;
	let returnWins;
	let returnMatches;
	const legalChars = /^[a-zA-z0-9\{\}\<\>\[\]\+\*.,?!;\s']*$/;

	const checkChars = legalChars.test(username);
	const checkChars2 = legalChars.test(scoreId); 
	
	if (!checkChars || !checkChars2){
		return res.status(422).json({
			code:422,
			reason:"ValidationError",
			message:"Illegal Character",
			location: checkChars
		});
	}
	return User.find({"username":username})

	.then(user => {
		let oldScores = user[0].scores.slice();
		let oldHighScores = user[0].highScores.slice();
		let oldHighScoresPpt = user[0].highScoresPpt.slice();
		let newScores = findById(scoreId,oldScores);
		let newHighScore = findById(scoreId,oldHighScores);
		let newHighScorePpt = findById(scoreId,oldHighScoresPpt);
		let updateHighScore = newHighScore.newArray.slice();
		let updateHighScorePpt = newHighScorePpt.newArray.slice();
		let userTotal = newScores.newArray.slice();
		let userPpt = newScores.newArray.slice();
		let newTotalHighScore = organizeScores(userTotal,"totalScore");
		let newPptHighScore = organizeScores(userPpt,"pointsPerTurn");
		returnMatches = user[0].matches - 1;
		returnWins = user[0].wins - newScores.win;
		console.log("calling update ftn");
		let finalHighScores = updateHighScoresArrays(userTotal, updateHighScore,"totalScore");
		let finalHighScoresppt = updateHighScoresArrays(userPpt, updateHighScorePpt,"pointsPerTurn");
		console.log("update db");
		return User.findOneAndUpdate({"username":username}, {$set:{scores:newScores.newArray,highScores:finalHighScores,highScoresPpt:finalHighScoresppt, wins:returnWins,matches:returnMatches}})
	})
	.then(user =>{

		return res.json({
			message:"Success"
		});
	})
		
	.catch(err => {
		
		return res.json({"err":err});
	});
});

function findIndex(arr, id){
	let returnId;
	for(let i = 0; i < arr.length;i++){
		if(arr[i].id == id){
			returnId = i;
			return returnId;
		}
	}
	return returnId;
}

function updateScoreArray(oldArr, newData, index){

	let returnArr = oldArr.slice();
	console.log("updating score array", returnArr[index]);
	for(let key in returnArr[index]){
		console.log(key);
		if(newData.hasOwnProperty(key) && key !== "id"){
			console.log("found key");
			returnArr[index][key] = newData[key];
			console.log(returnArr[index][key], newData[key]);

		}
	}
	return returnArr;
}

router.put("/updatescore", jwtAuth, jsonParser, (req,res)=> {
	let {username,score} =  req.body;
	
	for (let key in req.body){
		if(key === "username" || key === "score"){
			continue;
		}
		else{
			return res.json({code:500, message:"an error occured"});
		}
		
	}

	const legalChars = /^[a-zA-z0-9\{\}\<\>\[\]\+\*.,?!;\s-']*$/;
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

	return User.find({"username":username})

	.then(user => {
		let newScores = user[0].scores.slice();
		let newHighScores = user[0].highScores.slice();
		let newHighScoresPpt = user[0].highScoresPpt.slice();
		const scoreIndex = findIndex(newScores,score.id);
		const highScoreIndex = findIndex(newHighScores,score.id);
		const highScoreIndexPpt = findIndex(newHighScoresPpt,score.id);
		console.log("index", scoreIndex,highScoreIndex,highScoreIndexPpt);

		newScores = updateScoreArray(newScores,score,scoreIndex);
		console.log(score);

		if(highScoreIndex !== undefined){
			newHighScores = updateScoreArray(newHighScores,score,highScoreIndex);
		}
		if(highScoreIndexPpt !== undefined){
			newHighScoresPpt = updateScoreArray(newHighScoresPpt,score,highScoreIndexPpt);
		}
		return User.findOneAndUpdate({"username":username}, {$set:{scores:newScores,highScores:newHighScores,highScoresPpt:newHighScoresPpt}})

	})

	.then(user =>{

		return res.json({
			message:"Success"
		});
	})
		
	.catch(err => {
		
		return res.json({"err":err});
	});

});

module.exports = {router};