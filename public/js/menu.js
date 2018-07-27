
let expansionObj = {
	"base":true,
	"Dark City":true
};

let heroChoice1;
let choice;
function resetPage(){
	const noneString = `<option value="none">None</option>`
	$(".jsHeroSelect1").empty();
	$(".jsHeroSelect2").empty();
	$(".jsHeroSelect3").empty();
	$(".jsMastermindSelect").empty();
	$(".jsSchemeSelect").empty();
	$(".jsHenchmenSelect").empty();
	$(".jsVillainSelect").empty();
	$(".jsHeroSelect1").append(noneString);
	$(".jsHeroSelect2").append(noneString);
	$(".jsHeroSelect3").append(noneString);
	$(".jsMastermindSelect").append(noneString);
	$(".jsSchemeSelect").append(noneString);
	$(".jsHenchmenSelect").append(noneString);
	$(".jsVillainSelect").append(noneString);
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
		newString += `<option value="${newdata[i].name}">${newdata[i].name}</option>`;
	}
	return newString;
}

function getCharServerSuccess(data){
	if (data.error === "No results"){
		$(".loader").css("display","none");
		let imgUrl = "https://www.tradingcarddb.com/Images/Cards/Non-Sport/138214/138214-9150087Bk.jpg";
		if(choice === 1){
			$(".jsImage1").attr("src",imgUrl);
		}
		else if(choice === 2){
			$(".jsImage2").attr("src",imgUrl);
		}
		else if(choice === 3){
			$(".jsImage3").attr("src",imgUrl);
		}
		else if(choice === 4){
			$(".jsImage4").attr("src",imgUrl);
		}
	}
	else{
		$(".loader").css("display","none");
		let finalImgUrl = data.path + "/portrait_xlarge" + "." + data.extension;
		if(choice === 1){
			$(".jsImage1").attr("src",finalImgUrl);
		}
		else if(choice === 2){
			$(".jsImage2").attr("src",finalImgUrl);
		}
		else if(choice === 3){
			$(".jsImage3").attr("src",finalImgUrl);
		}
		else if(choice === 4){
			$(".jsImage4").attr("src",finalImgUrl);
		}
	}
}

function getCharServerError(err){
	$(".loader").css("display","none");
	if(err.responseText === "Unauthorized"){
		window.location.href = "/index.html";
	}
	else{
		alert("An error occured");
	}
}

function getCharServer(){
	let d = new Date();
	let timeStamp = d.getTime();
	timeStamp = timeStamp.toString();
	if (heroChoice1 === "Wolverine Dark City"){
		heroChoice1 = "Wolverine";
	}
	if (heroChoice1 === "Ironman"){
		heroChoice1 = "Iron man";
	}
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/api/users/characterimg",
		data:{
			"timeStamp":timeStamp,
			character:heroChoice1

		},
		success: getCharServerSuccess
		,
		error: getCharServerError,
		dataType: 'json'
	};
	$.ajax(settings);
}

function checkDropdowns(){

	$(".jsHeroSelect1").change(function(){
		$(".loader").css("display","initial");
		let selectedVal = $(this).find(':selected').val();
		heroChoice1 = selectedVal;
		choice = 1;
		getCharServer();
		
	});
	$(".jsHeroSelect2").change(function(){
		$(".loader").css("display","initial");
		let selectedVal = $(this).find(':selected').val();
		heroChoice1 = selectedVal;
		choice = 2;
		getCharServer();
		
	});
	$(".jsHeroSelect3").change(function(){
		$(".loader").css("display","initial");
		let selectedVal = $(this).find(':selected').val();
		heroChoice1 = selectedVal;
		choice = 3;
		getCharServer();
	});
	$(".jsMastermindSelect").change(function(){
		$(".loader").css("display","initial");
		let selectedVal = $(this).find(':selected').val();
		heroChoice1 = selectedVal;
		choice = 4;
		getCharServer();
	});
}

function filterData(data){
	let copyData = data;
	let finalData;
	let filterBy = []
	for(let key in expansionObj){
		if (expansionObj[key]===false){
			filterBy.push(key);
		}
	}
	for(let i=copyData.data.length -1; i >=0 ; i--){
		if(filterBy.includes(copyData.data[i].expansion)){
			copyData.data.splice(i,1);	
		}
	}
	return copyData;
}

function populateHeroData(data){
	let newData = filterData(data);
	options = createDataString(newData);
	$(".jsHeroSelect1").append(options);
	$(".jsHeroSelect2").append(options);
	$(".jsHeroSelect3").append(options);

}

function getError(err){
	$(".loader").css("display","none");
	if(err.responseText === "Unauthorized"){
		window.location.href = "/index.html";
	}
	else{
		alert("An error occured");
	}
}

function getHeroes(){
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected/heroes",
		success: populateHeroData,
		error: getError
		
	};
	$.ajax(settings);	
}

function populateMastermindData(data){
	let newData = filterData(data);
	options = createDataString(newData);
	$(".jsMastermindSelect").append(options);
}

function getMasterminds(){
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected/masterminds",
		success: populateMastermindData,
		error: getError
	};
	$.ajax(settings);	
}

function populateSchemeData(data){
	let newData = filterData(data);
	options = createDataString(newData);
	$(".jsSchemeSelect").append(options);
}

function getSchemes(){
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected/scheme",
		success: populateSchemeData,
		error: getError
	};
	$.ajax(settings);	
}

function populateHenchmenData(data){
	let newData = filterData(data);
	options = createDataString(newData);
	$(".jsHenchmenSelect").append(options);
}

function getHenchmen(){
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected/henchmen",
		success: populateHenchmenData,
		error: getError
	};
	$.ajax(settings);	
}

function populateVillainData(data){
	let newData = filterData(data);
	options = createDataString(newData);
	$(".jsVillainSelect").append(options);
	$(".loader").css("display","none");
}

function getVillains(){
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/protected/villains",
		success: populateVillainData,
		error: getError
	};
	$.ajax(settings);	
}

function getAuthSuccess(data){
	$(".jsUserName").text(sessionStorage.getItem("user") + " Logged In");
}

function getAuthError(err){
	if(err.responseText === "Unauthorized"){
		window.location.href = "/index.html";
	}
	else{
		alert("An error occured");
	}
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

function addedScore(data){
	alert("Score Added!");
	let imgUrl = "https://www.tradingcarddb.com/Images/Cards/Non-Sport/138214/138214-9150087Bk.jpg";
	$(".jsWinSelect").val("y");
	$(".jsTurnInput").val("0");
	$(".jsEscapedVillains").val("0");	
	$(".jsSchemesInput").val("0");
	$(".jsBystanderInput").val("0");
	$(".jsVictoryPointInput").val("0");
	$(".jsMastermindSelect").val("none");
	$(".jsHeroSelect1").val("none");
	$(".jsHeroSelect2").val("none");
	$(".jsHeroSelect3").val("none");
	$(".jsHenchmenSelect").val("none");
	$(".jsVillainSelect").val("none");
	$(".jsSchemeSelect").val("none");
	$(".jsImage1").attr("src",imgUrl);
	$(".jsImage2").attr("src",imgUrl);
	$(".jsImage3").attr("src",imgUrl);
	$(".jsImage4").attr("src",imgUrl);

}

function addScoreError(err){
	$(".jsMessage").text("An error occured");
	if(err.responseText === "Unauthorized"){
		window.location.href = "/index.html";
	}
	else{
		alert("An error occured");
	}
}

function addScore(){
	$(".jsScoreEntry").submit(function(event){
		event.preventDefault();
		let scoreData = {
			username:sessionStorage.getItem("user"),
			score:{win: $(".jsWinSelect").val(),
			numTurns: $(".jsTurnInput").val(),
			numVillains: $(".jsEscapedVillains").val(),
			numSchemes: $(".jsSchemesInput").val(),
			numBystanders: $(".jsBystanderInput").val(),
			victoryPoints: $(".jsVictoryPointInput").val(),
			mastermind: $(".jsMastermindSelect").val(),
			scheme: $(".jsSchemeSelect").val(),
			hero1: $(".jsHeroSelect1").val(),
			hero2: $(".jsHeroSelect2").val(),
			hero3: $(".jsHeroSelect3").val(),
			henchmen: $(".jsHenchmenSelect").val(),
			villain: $(".jsVillainSelect").val()
			}

		};

	const settings = {
		method: "PUT",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/api/users/addscore",
		data: JSON.stringify(scoreData),
		success: addedScore,
		error: addScoreError,
		dataType: 'json',
		contentType: 'application/json'
	};
		$.ajax(settings);
	});
}

function checkBoxListener(){

	$(".jsBaseCheck").change(function(){
		if($(".jsBaseCheck").is(":checked")){
			$(".loader").css("display","initial");
			resetPage();
			expansionObj["base"] = true;
			getMasterminds();
			getHeroes();
			getSchemes();
			getHenchmen();
			getVillains();
		}
		else{
			$(".loader").css("display","initial");
			resetPage();
			expansionObj["base"] = false;
			getMasterminds();
			getHeroes();
			getSchemes();
			getHenchmen();
			getVillains();
		}
		
	});

	$(".jsDarkCityCheck").change(function(){
		if($(".jsDarkCityCheck").is(":checked")){
			$(".loader").css("display","initial");
			resetPage();
			expansionObj["Dark City"] = true;
			getMasterminds();
			getHeroes();
			getSchemes();
			getHenchmen();
			getVillains();
		}
		else{
			$(".loader").css("display","initial");
			resetPage();
			expansionObj["Dark City"] = false;
			getMasterminds();
			getHeroes();
			getSchemes();
			getHenchmen();
			getVillains();
		}
	});
}

function initializeMenu(){
	getAuth();
	getMasterminds();
	getHeroes();
	getSchemes();
	getHenchmen();
	getVillains();
	addScore();
	checkDropdowns();
	checkBoxListener();
}

$(initializeMenu);