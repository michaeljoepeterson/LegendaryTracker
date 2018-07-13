'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {User} = require('../models/userData');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { publicKey,privateKey } = require('../config');
const request = require('request');
const jsonParser = bodyParser.json();
let MD5 = function(d){let result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
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

router.get("/highScore", jwtAuth,(req,res) =>{
	
	let username =  req.query.username;
	//console.log(username);
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
	//console.log(username);
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
		//console.log(user[0].scores);
		let userTotal = user[0].scores.slice();
		let userPpt = user[0].scores.slice();
		let newTotalHighScore = organizeScores(userTotal,"totalScore");
		let newPptHighScore = organizeScores(userPpt,"pointsPerTurn");
		//console.log(newPptHighScore);
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

router.get("/key",jwtAuth,(req,res) =>{
	

	return res.json({
			publickey:publicKey,
			privatekey: privateKey
		});

});

router.get("/characterimg",jwtAuth,(req,res) =>{
	
	let timeStamp =  req.query.timeStamp;
	let m5Hash = MD5(timeStamp + privateKey+publicKey);
	let character = req.query.character;
	let endUrl = "http://gateway.marvel.com/v1/public/characters?ts=" + timeStamp + "&apikey=" + publicKey + "&hash=" + m5Hash + "&name=" + character; 
	request(endUrl,function(err,response,body){
		console.log('error:', err);
        //console.log('statusCode:', response); 
        //console.log(body);
        let parsed = JSON.parse(body);
        //console.log('body:', parsed.data.results.length);
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
        
	});

});

module.exports = {router};
