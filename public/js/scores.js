function createScoreString(score,index){
	let scoreNum = index + 1;
	let returnString = `<tr>
				<th>${scoreNum}</th>
				<th>${score.hero1},${score.hero2},${score.hero3}</th>
				<th>${score.mastermind}</th>
				<th>${score.scheme}</th>
				<th>${score.villain}</th>
				<th>${score.henchmen}</th>
				<th>${score.numBystanders}</th>
				<th>${score.numSchemes}</th>
				<th>${score.numTurns}</th>
				<th>${score.numVillains}</th>
				<th>${score.pointsPerTurn}</th>
				<th>${score.totalScore}</th>
			</tr>`
	return returnString;
}


function getHighScoresError(err){
	console.log(err);
}

function getHighScoresSuccess(data){
	console.log(data);
	let totalScoreString;
	for(let i = 0;i < data.highScores.length;i++){
		totalScoreString = createScoreString(data.highScores[i],i);
		$(".jsTableTotalScore").append(totalScoreString);
	}
	let pptString;
	for(let i = 0;i < data.highScores.length;i++){
		pptString = createScoreString(data.highScoresPpt[i],i);
		$(".jsTablePpt").append(pptString);
	}

}

function getHighScores(){
	const user = {username:sessionStorage.getItem("user")};
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/api/users/highScore",
		data:user,
		success: getHighScoresSuccess,
		error: getHighScoresError,
		dataType: 'json'
	};
	$.ajax(settings);
}

function getAuthSuccess(data){
	//console.log(data);
	$(".jsUserName").text(sessionStorage.getItem("user") + " Logged In");
	
}

function getAuthError(err){
	console.log(err);
	//alert("Please login");
	window.location.href = "/index.html";
}

function getAuth(){	
	//console.log("Attempt to get page");
	
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected",
		success: getAuthSuccess,
		error: getAuthError
	};
	$.ajax(settings);
	
}

function initializePage(){	
	getAuth();
	getHighScores();
}

$(initializePage);