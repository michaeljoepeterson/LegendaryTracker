function checkDropdown(){
	$(".jsScoreSelect").change(function(){
		let selectedVal = $(this).find(':selected').val();
		console.log(selectedVal);
		if (selectedVal === "total"){
			$(".scoreTableTotal").css("display","inherit");
			$(".scoreTableppt").css("display","none");
		}
		else if(selectedVal === "ppt"){
			$(".scoreTableTotal").css("display","none");
			$(".scoreTableppt").css("display","inherit");
		}
	});
}

function createScoreString(score,index){
	let scoreNum = index + 1;
	let winText;
	if (score.win === "y"){
		winText = "Yes"
	}
	else{
		winText = "No"
	}
	let returnString = `<tr>
				<td>${scoreNum}</td>
				<td>${winText}</td>
				<td>${score.hero1},${score.hero2},${score.hero3}</td>
				<td>${score.mastermind}</td>
				<td>${score.scheme}</td>
				<td>${score.villain}</td>
				<td>${score.henchmen}</td>
				<td>${score.numBystanders}</td>
				<td>${score.numSchemes}</td>
				<td>${score.numTurns}</td>
				<td>${score.numVillains}</td>
				<td>${score.pointsPerTurn}</td>
				<td>${score.totalScore}</td>
			</tr>`
	return returnString;
}


function getUserInfoError(err){
	console.log(err);
}

function getUserInfoSuccess(data){
	console.log(data);
	$(".jsMatches").text(`Matches: ${data.matches}`);
	$(".jsWins").text(`Wins: ${data.wins}`);
	$(".jsLosses").text(`Losses: ${data.matches - data.wins}`);
	$(".jsPercentage").text(`Win Percentage: ${(data.wins / data.matches * 100).toFixed(2)}%`);

	let totalScoreString;
	for(let i = 0;i < data.scoresTotal.length;i++){
		totalScoreString = createScoreString(data.scoresTotal[i],i);
		$(".jsTableTotalScore").append(totalScoreString);
	}
	let pptString;
	for(let i = 0;i < data.scoresPpt.length;i++){
		pptString = createScoreString(data.scoresPpt[i],i);
		$(".jsTablePpt").append(pptString);
	}
}

function getUserInfo(){
	const user = {username:sessionStorage.getItem("user")};
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/api/users/characterimg",
		data:user,
		success: getUserInfoSuccess,
		error: getUserInfoError,
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
	getUserInfo();
	checkDropdown();
}

$(initializePage);