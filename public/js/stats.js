let filterChoice = "none";
let filterBy = "none";
let rowData = {};
function clearTableLoad(){
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
				</tr>`;
	$(".jsTableTotalScore").empty();
	$(".jsTablePpt").empty();
	$(".jsTableTotalScore").append(headerString);
	$(".jsTablePpt").append(headerString);
}
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
				</tr>`;
	$(".jsFilterTable").empty();
	$(".jsFilterTableppt").empty();
	$(".jsFilterTable").append(headerString);
	$(".jsFilterTableppt").append(headerString);
}

function emptyDropdown(choice){
	const noneString = `<option value="none">None</option>`
	if (choice === 1){
		$(".jsNextFilterSelect").empty();
		$(".jsNextFilterSelect").append(noneString);
	}
	else if (choice === 2){
		$("#mastermindSelectModal").empty();
		$("#hero1SelectModal").empty();
		$("#hero2SelectModal").empty();
		$("#hero3SelectModal").empty();
		$(".jsNextFilterSelect").append(noneString);
		$("#mastermindSelectModal").append(noneString);
		$("#hero1SelectModal").append(noneString);
		$("#hero2SelectModal").append(noneString);
		$("#hero3SelectModal").append(noneString);
	}	
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
	console.log(data);
	options = createDataString(data);
	$(".jsNextFilterSelect").append(options);
}

function populateModal(data){
	if (data.data[0].classification === "hero"){
		options = createDataString(data);
		$("#hero1SelectModal").append(options);
		$("#hero2SelectModal").append(options);
		$("#hero3SelectModal").append(options);
		$("#hero1SelectModal").val(rowData.heroes[0]);
		$("#hero2SelectModal").val(rowData.heroes[1]);
		$("#hero3SelectModal").val(rowData.heroes[2]);

	}else{
		let idString = "#" + data.data[0].classification + "SelectModal";
		options = createDataString(data);
		//console.log(idString);
		$(idString).append(options);
		$(idString).val(rowData[data.data[0].classification]);
	}
	
}

function getError(err){

	if(err.responseText === "Unauthorized"){
		window.location.href = "/index.html";
	}
}

function getSchemes(callback){
	//html href
	//console.log("get")
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected/scheme",
		success: callback,
		error: getError
	};
	$.ajax(settings);	
}

function getMasterminds(callback){
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected/masterminds",
		success: callback,
		error: getError
	};
	$.ajax(settings);	
}

function getHeroes(callback){
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected/heroes",
		success: callback,
		error: getError
	};
	$.ajax(settings);	
}

function getHenchmen(callback){
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected/henchmen",
		success: callback,
		error: getError
	};
	$.ajax(settings);	
}

function getVillains(callback){
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected/villains",
		success: callback,
		error: getError
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
			emptyDropdown(1);
			$(".jsNextFilterSelect").hide();
			$(".scoreTableTotal").css("display","inherit");
			$(".scoreTableppt").css("display","none");
			$(".filterTable").css("display","none");
			$(".filterTableppt").css("display","none");
		}
		else if(selectedVal === "mastermind"){
			filterChoice = "mastermind"
			emptyDropdown(1);
			$(".jsNextFilterSelect").show();
			getMasterminds(populateData);
		}
		else if(selectedVal === "scheme"){
			filterChoice = "scheme"
			emptyDropdown(1);
			$(".jsNextFilterSelect").show();
			getSchemes(populateData);
		}
		else if(selectedVal === "hero"){
			filterChoice = "hero"
			emptyDropdown(1);
			$(".jsNextFilterSelect").show();
			getHeroes(populateData);
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
	let returnString = `<tr class="rowClick">
				<td id="scoreId">${scoreNum}</td>
				<td id="winText">${winText}</td>
				<td id="hero">${score.hero1},${score.hero2},${score.hero3}</td>
				<td id="mastermind">${score.mastermind}</td>
				<td id="scheme">${score.scheme}</td>
				<td id="villain">${score.villain}</td>
				<td id="henchmen">${score.henchmen}</td>
				<td id="numBystanders">${score.numBystanders}</td>
				<td id="numSchemes">${score.numSchemes}</td>
				<td id="numTurns" >${score.numTurns}</td>
				<td id="numVillains">${score.numVillains}</td>
				<td>${score.pointsPerTurn}</td>
				<td>${score.totalScore}</td>
				<td class="noDisplay" id="scoreIdDb">${score.id}</td>
			</tr>`
	return returnString;
}


function getUserInfoError(err){
	if(err.responseText === "Unauthorized"){
		window.location.href = "/index.html";
	}
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
			
			//scoreIds.push(data.scoresPpt[i].id);
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
	$(".noDisplay").hide();
	
}

function generateModal(){
	getMasterminds(populateModal);
	getHeroes(populateModal);
	getSchemes(populateModal);
	getVillains(populateModal);
	getHenchmen(populateModal);
}

function tableClicked(){
	$("table").on("click", ".rowClick", function(event){
		emptyDropdown(2);
		event.stopImmediatePropagation();
		let scoreId = $(this).children("#scoreId").text();
		let scoreIdDb = $(this).children("#scoreIdDb").text();
		rowData.scoreId = scoreIdDb;
		$(".jsModalHeader").text("Score ID " + scoreId);
		let mastermind = $(this).children("#mastermind").text();
		rowData.mastermind = mastermind;
		let scheme = $(this).children("#scheme").text();
		rowData.scheme = scheme;
		let villain = $(this).children("#villain").text();
		rowData.villian = villain;
		let henchmen = $(this).children("#henchmen").text();
		rowData.henchman = henchmen;
		let heroesText = $(this).children("#hero").text();
		let heroes = heroesText.split(",");
		rowData.heroes = heroes;
		/*
		let numBystanders = $(this).children("#numBystanders").text();
		rowData.numBystanders = numBystanders;
		let numSchemes = $(this).children("#numSchemes").text();
		rowData.numSchemes = numSchemes;
		let numTurns = $(this).children("#numTurns").text();
		rowData.numTurns = numTurns;
		let numVillains = $(this).children("#numVillains").text();
		rowData.numVillains = numVillains;
		let victoryPoints = $(this).children("#victoryPoints").text();
		rowData.victoryPoints = victoryPoints;
		*/
		generateModal();
		$('#myModal').modal('show');
		console.log(rowData);
		
	});
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
function updateSuccess(data){
	console.log(data);
	alert("Score updated!");
	location.reload();
}

function updateError(err){
	if(err.responseText === "Unauthorized"){
		window.location.href = "/index.html";
	}
}

function deleteSuccess(data){
	console.log(data);
	alert("Score deleted!");
	location.reload();
}

function deleteError(err){
	if(err.responseText === "Unauthorized"){
		window.location.href = "/index.html";
	}
}

function deleteRequest(){
	console.log(sessionStorage.getItem("user"));
	let userData = {
		username: sessionStorage.getItem("user"),
		scoreId: rowData.scoreId
	};
	const settings = {
		method: "DELETE",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/api/users/deletescore",
		data: JSON.stringify(userData),
		success: deleteSuccess,
		error: deleteError,
		dataType: 'json',
		contentType: 'application/json'
	};
	$.ajax(settings);
}

function updateRequest(){
	let scoreData = {
		username:sessionStorage.getItem("user"),
			score:{
			mastermind: $("#mastermindSelectModal").val(),
			scheme: $("#schemeSelectModal").val(),
			hero1: $("#hero1SelectModal").val(),
			hero2: $("#hero1SelectModal").val(),
			hero3: $("#hero1SelectModal").val(),
			henchmen: $("#henchmanSelectModal").val(),
			villain: $("#villianSelectModal").val(),
			id:rowData.scoreId
		}

	};

	const settings = {
		method: "PUT",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/api/users/updatescore",
		data: JSON.stringify(scoreData),
		success: updateSuccess,
		error: updateError,
		dataType: 'json',
		contentType: 'application/json'
	};
	$.ajax(settings);
	
}

function deleteButtonClicked(){
	$(".jsDeleteButton").click(function(event){
		//event.stopImmediatePropagation();
		deleteRequest();
	});
}

function updateButtonClicked(){
	$(".jsUpdateButton").click(function(event){
		//event.stopImmediatePropagation();
		updateRequest();
	});
}

function getAuthSuccess(data){
	$(".jsUserName").text(sessionStorage.getItem("user") + " Logged In");
	
}

function getAuthError(err){
	console.log(err);
	window.location.href = "/index.html";
}

function getAuth(){	
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
	getUserInfo();
	checkDropdown();
	tableClicked();
	deleteButtonClicked();
	updateButtonClicked();
}

$(initializePage);