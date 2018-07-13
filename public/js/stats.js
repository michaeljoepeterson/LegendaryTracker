let filterChoice = "none";
let filterBy = "none";

function clearTables(){
	const headerString = `<tr>
					<th>Score</th>
					<th>Win</th>
					<th>Heroes</th>
					<th>Mastermind</th>
					<th>Scheme</th>
					<th>Villain Group</th>
					<th>Henchmen Goup</th>
					<th>Bystanders Lost</th>
					<th>Number of Schemes</th>
					<th>Number of Turns</th>
					<th>Number of Escaped Villains</th>						
					<th>Points Per Turn</th>
					<th>Total Score</th>
				</tr>`
	$(".jsFilterTable").empty();
	$(".jsFilterTableppt").empty();
	$(".jsFilterTable").append(headerString);
	$(".jsFilterTableppt").append(headerString);
}

function emptyDropdown(){
	const noneString = `<option value="none">None</option>`
	$(".jsNextFilterSelect").empty();
	$(".jsNextFilterSelect").append(noneString);
}

function organizeDropdown(arr){
	return arr.sort(function(a,b){
		if(a.name < b.name){
			return -1
		}
		if(a.name > b.name){
			return 1
		}
		return 0
	});
}

function createDataString(data){
	let newString;
	const newdata = organizeDropdown(data.data);
	for (let i = 0;i < newdata.length;i++){
		//console.log(data.data[i].name);
		newString += `<option value="${newdata[i].name}">${newdata[i].name}</option>`;
	}
	return newString;
}

function populateData(data){
	options = createDataString(data);
	$(".jsNextFilterSelect").append(options);
}

function getSchemes(){
	//html href
	//console.log("get")
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected/scheme",
		success: populateData,
		error: function(err){
			console.log(err);
		}
	};
	$.ajax(settings);	
}

function getMasterminds(){
	//html href
	//console.log("get")
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected/masterminds",
		success: populateData,
		error: function(err){
			console.log(err);
		}
	};
	$.ajax(settings);	
}

function getHeroes(){
	//html href
	//console.log("get")
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected/heroes",
		success: populateData,
		error: function(err){
			console.log(err);
		}
	};
	$.ajax(settings);	
}

function checkDropdown(){
	$(".jsScoreSelect").change(function(){
		let selectedVal = $(this).find(':selected').val();
		//console.log(selectedVal);
		let filterType = $(".jsFilterSelect").val(); 
		if (selectedVal === "total" && (filterType === "none" || filterBy === "none")){
			$(".scoreTableTotal").css("display","inherit");
			$(".scoreTableppt").css("display","none");
		}
		else if(selectedVal === "ppt" && (filterType === "none" || filterBy === "none")){
			$(".scoreTableTotal").css("display","none");
			$(".scoreTableppt").css("display","inherit");
		}
		else if(selectedVal === "total"){
			$(".filterTable").css("display","inherit");
			$(".filterTableppt").css("display","none");
		}
		else if(selectedVal === "ppt"){
			$(".filterTable").css("display","none");
			$(".filterTableppt").css("display","inherit");
		}
	});
	$(".jsFilterSelect").change(function(){
		let selectedVal = $(this).find(':selected').val();
		console.log(selectedVal);
		if(selectedVal === "none"){
			filterChoice = "none"
			emptyDropdown();
			$(".jsNextFilterSelect").hide();
			$(".scoreTableTotal").css("display","inherit");
			$(".scoreTableppt").css("display","none");
			$(".filterTable").css("display","none");
			$(".filterTableppt").css("display","none");
		}
		else if(selectedVal === "mastermind"){
			filterChoice = "mastermind"
			emptyDropdown();
			$(".jsNextFilterSelect").show();
			getMasterminds();
		}
		else if(selectedVal === "scheme"){
			filterChoice = "scheme"
			emptyDropdown();
			$(".jsNextFilterSelect").show();
			getSchemes();
		}
		else if(selectedVal === "hero"){
			filterChoice = "hero"
			emptyDropdown();
			$(".jsNextFilterSelect").show();
			getHeroes();
		}
	});
	$(".jsNextFilterSelect").change(function(){
		let selectedVal = $(this).find(':selected').val();
		filterBy = selectedVal;
		console.log(selectedVal);
		if (selectedVal === "none"){
			$(".scoreTableTotal").css("display","inherit");
			$(".scoreTableppt").css("display","none");
			$(".filterTable").css("display","none");
			$(".filterTableppt").css("display","none");
		}else{
			getUserInfo();
			$(".scoreTableTotal").css("display","none");
			$(".scoreTableppt").css("display","none");
			$(".filterTable").css("display","inherit");
			$(".filterTableppt").css("display","none");
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
	let pptString;
	clearTables();
	if(filterChoice === "none" || filterBy === "none"){
		for(let i = 0;i < data.scoresTotal.length;i++){
			totalScoreString = createScoreString(data.scoresTotal[i],i);
			$(".jsTableTotalScore").append(totalScoreString);
		}
		
		for(let i = 0;i < data.scoresPpt.length;i++){
			pptString = createScoreString(data.scoresPpt[i],i);
			$(".jsTablePpt").append(pptString);
		}
	}
	else if(filterChoice === "hero"){
		for(let i = 0;i < data.scoresTotal.length;i++){
			if(data.scoresTotal[i].hero1 === filterBy || data.scoresTotal[i].hero2 === filterBy || data.scoresTotal[i].hero3 === filterBy){
				totalScoreString = createScoreString(data.scoresTotal[i],i);
				$(".jsFilterTable").append(totalScoreString);
			}
			
		}
		
		for(let i = 0;i < data.scoresPpt.length;i++){
			if(data.scoresPpt[i].hero1 === filterBy || data.scoresPpt[i].hero2 === filterBy || data.scoresPpt[i].hero3 === filterBy){
				pptString = createScoreString(data.scoresPpt[i],i);
			$(".jsFilterTableppt").append(pptString);
			}
			
		}
	}
	else{
		for(let i = 0;i < data.scoresTotal.length;i++){
			if(data.scoresTotal[i][filterChoice] ===filterBy){
				totalScoreString = createScoreString(data.scoresTotal[i],i);
				$(".jsFilterTable").append(totalScoreString);
			}
			
		}
		
		for(let i = 0;i < data.scoresPpt.length;i++){
			if(data.scoresPpt[i][filterChoice] ===filterBy){
				pptString = createScoreString(data.scoresPpt[i],i);
			$(".jsFilterTableppt").append(pptString);
			}
			
		}
	}
}

function getUserInfo(){
	const user = {username:sessionStorage.getItem("user")};
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/api/users/stats",
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