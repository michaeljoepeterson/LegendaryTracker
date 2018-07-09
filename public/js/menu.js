//console.log(sessionStorage.getItem("Bearer"));
//console.log(sessionStorage.getItem("user"));

let expansionObj = {
	"base":true,
	"Dark City":true
};

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

function checkDropdowns(){

	//add get requests to api
	$(".jsHeroSelect1").change(function(){
		let selectedVal = $(this).find(':selected').val();
		console.log(selectedVal);
	});
	$(".jsHeroSelect2").change(function(){
		let selectedVal = $(this).find(':selected').val();
		console.log(selectedVal);
	});
	$(".jsHeroSelect3").change(function(){
		let selectedVal = $(this).find(':selected').val();
		console.log(selectedVal);
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
	console.log(filterBy);
	//console.log(filterBy);
	for(let i=copyData.data.length -1; i >=0 ; i--){
		//console.log(copyData.data[i].expansion);
		//console.log("test spice");
		if(filterBy.includes(copyData.data[i].expansion)){
			//console.log(copyData.data[i]);
			copyData.data.splice(i,1);	
		}
	}
	console.log(copyData);
	return copyData;
}

function populateHeroData(data){
	let newData = filterData(data);
	options = createDataString(newData);
	$(".jsHeroSelect1").append(options);
	$(".jsHeroSelect2").append(options);
	$(".jsHeroSelect3").append(options);

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
		success: populateHeroData,
		error: function(err){
			console.log(err);
		}
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
		error: function(err){
			console.log(err);
		}
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
		error: function(err){
			console.log(err);
		}
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
		error: function(err){
			console.log(err);
		}
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
		error: function(err){
			console.log(err);
		}
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
	console.log("Attempt to get menu");
	
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

	$(".jsMessage").text("Score Added!");
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

}

function addScoreError(err){
	console.log(err);
	$(".jsMessage").text("An error occured");
	//on unauthorized need to go back to sign in screen
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
			console.log("dark city checked");
			resetPage();
			expansionObj["Dark City"] = true;
			getMasterminds();
			getHeroes();
			getSchemes();
			getHenchmen();
			getVillains();
		}
		else{
			console.log("dark city unchecked");
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
	//possibly have optional paramters so that can select for expansions
	//https://developer.marvel.com/
	//https://comicvine.gamespot.com/api/
	//possibly export data as csv
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
//getMenu();