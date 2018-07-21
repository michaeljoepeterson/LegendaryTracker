
let expansionObj = {
	"base":true,
	"Dark City":true
};

let heroChoice1;
//let imgUrl;
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
		//console.log(data.data[i].name);
		newString += `<option value="${newdata[i].name}">${newdata[i].name}</option>`;
	}
	return newString;
}

function getCharServerSuccess(data){
	console.log(data);
	if (data.error === "No results"){
		console.log("no data");
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
	}
	else{
		let finalImgUrl = data.path + "/portrait_xlarge" + "." + data.extension;
		console.log(finalImgUrl);
		//imgUrl = finalImgUrl;
		if(choice === 1){
			$(".jsImage1").attr("src",finalImgUrl);
		}
		else if(choice === 2){
			$(".jsImage2").attr("src",finalImgUrl);
		}
		else if(choice === 3){
			$(".jsImage3").attr("src",finalImgUrl);
		}
	}
}

function getCharServerError(err){
	console.log(err);
	if(err.responseText === "Unauthorized"){
		window.location.href = "/index.html";
	}
}

function getCharServer(){
	let d = new Date();
	let timeStamp = d.getTime();
	timeStamp = timeStamp.toString();
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

	//add get requests to api
	$(".jsHeroSelect1").change(function(){
		let selectedVal = $(this).find(':selected').val();
		console.log(selectedVal);
		heroChoice1 = selectedVal;
		choice = 1;
		getCharServer();
		
	});
	$(".jsHeroSelect2").change(function(){
		let selectedVal = $(this).find(':selected').val();
		console.log(selectedVal);
		//console.log(MD5("1abcd1234"))
		heroChoice1 = selectedVal;
		choice = 2;
		getCharServer();
		
	});
	$(".jsHeroSelect3").change(function(){
		let selectedVal = $(this).find(':selected').val();
		console.log(selectedVal);
		heroChoice1 = selectedVal;
		choice = 3;
		//getKey();
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
	//console.log(filterBy);
	//console.log(filterBy);
	for(let i=copyData.data.length -1; i >=0 ; i--){
		//console.log(copyData.data[i].expansion);
		//console.log("test spice");
		if(filterBy.includes(copyData.data[i].expansion)){
			//console.log(copyData.data[i]);
			copyData.data.splice(i,1);	
		}
	}
	//console.log(copyData);
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

	if(err.responseText === "Unauthorized"){
		window.location.href = "/index.html";
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
	//console.log(data.data[0]);
	let newData = filterData(data);
	options = createDataString(newData);
	$(".jsMastermindSelect").append(options);
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
		success: populateMastermindData,
		error: getError
	};
	$.ajax(settings);	
}

function populateSchemeData(data){
	//console.log(data.data[0]);
	let newData = filterData(data);
	options = createDataString(newData);
	$(".jsSchemeSelect").append(options);
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
		success: populateSchemeData,
		error: getError
	};
	$.ajax(settings);	
}

function populateHenchmenData(data){
	//console.log(data.data[0]);
	let newData = filterData(data);
	options = createDataString(newData);
	$(".jsHenchmenSelect").append(options);
}

function getHenchmen(){
	//html href
	//console.log("get")
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
	//console.log(data.data[0]);
	let newData = filterData(data);
	options = createDataString(newData);
	$(".jsVillainSelect").append(options);
}

function getVillains(){
	//console.log("get")
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
	//console.log(data);
	$(".jsUserName").text(sessionStorage.getItem("user") + " Logged In");
	console.log(sessionStorage.getItem("user"));
}

function getAuthError(err){
	console.log(err);
	//alert("Please login");
	window.location.href = "/index.html";
}

function getAuth(){	
	//console.log("Attempt to get menu");
	
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
	//$(".jsMessage").text("Score Added!");
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

}

function addScoreError(err){
	//console.log(err);
	$(".jsMessage").text("An error occured");
	//on unauthorized need to go back to sign in screen
	if(err.responseText === "Unauthorized"){
		window.location.href = "/index.html";
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
		//getHeroes();
		
		if($(".jsBaseCheck").is(":checked")){
			console.log("base checked");
			resetPage();
			expansionObj["base"] = true;
			getMasterminds();
			getHeroes();
			getSchemes();
			getHenchmen();
			getVillains();
		}
		else{
			console.log("base unchecked");
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
			//console.log("dark city checked");
			resetPage();
			expansionObj["Dark City"] = true;
			getMasterminds();
			getHeroes();
			getSchemes();
			getHenchmen();
			getVillains();
		}
		else{
			//console.log("dark city unchecked");
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