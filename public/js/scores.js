let filterChoice = "none";
let filterBy = "none";

function clearTables(){
	const headerString = `<tr>
					<th>Score</th>
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
			getHighScores();
			$(".scoreTableTotal").css("display","none");
			$(".scoreTableppt").css("display","none");
			$(".filterTable").css("display","inherit");
			$(".filterTableppt").css("display","none");
		}
		
	});
}

function createScoreString(score,index){
	let scoreNum = index + 1;
	let returnString = `<tr>
				<td>${scoreNum}</td>
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


function getHighScoresError(err){
	console.log(err);
}

function getHighScoresSuccess(data){
	console.log(data);
	let totalScoreString;
	let pptString;
	clearTables();
	if(filterChoice === "none" || filterBy === "none"){
		for(let i = 0;i < data.highScores.length;i++){
			totalScoreString = createScoreString(data.highScores[i],i);
			$(".jsTableTotalScore").append(totalScoreString);
		}
		
		for(let i = 0;i < data.highScoresPpt.length;i++){
			pptString = createScoreString(data.highScoresPpt[i],i);
			$(".jsTablePpt").append(pptString);
		}
	}
	else if(filterChoice === "hero"){
		for(let i = 0;i < data.highScores.length;i++){
			if(data.highScores[i].hero1 === filterBy || data.highScores[i].hero2 === filterBy || data.highScores[i].hero3 === filterBy){
				totalScoreString = createScoreString(data.highScores[i],i);
				$(".jsFilterTable").append(totalScoreString);
			}
			
		}
		
		for(let i = 0;i < data.highScoresPpt.length;i++){
			if(data.highScoresPpt[i].hero1 === filterBy || data.highScoresPpt[i].hero2 === filterBy || data.highScoresPpt[i].hero3 === filterBy){
				pptString = createScoreString(data.highScoresPpt[i],i);
			$(".jsFilterTableppt").append(pptString);
			}
			
		}
	}
	else{
		for(let i = 0;i < data.highScores.length;i++){
			if(data.highScores[i][filterChoice] ===filterBy){
				totalScoreString = createScoreString(data.highScores[i],i);
				$(".jsFilterTable").append(totalScoreString);
			}
			
		}
		
		for(let i = 0;i < data.highScoresPpt.length;i++){
			if(data.highScoresPpt[i][filterChoice] ===filterBy){
				pptString = createScoreString(data.highScoresPpt[i],i);
			$(".jsFilterTableppt").append(pptString);
			}
			
		}
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
	$(".jsNextFilterSelect").hide();
	getAuth();
	getHighScores();
	checkDropdown();
}

$(initializePage);