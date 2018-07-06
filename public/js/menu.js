//console.log(sessionStorage.getItem("Bearer"));
//console.log(sessionStorage.getItem("user"));

function createDataString(data){
	let newString;
	for (let i = 0;i < data.data.length;i++){
		//console.log(data.data[i].name);
		newString += `<option value="${data.data[i].name}">${data.data[i].name}</option>`;
	}
	return newString;
}

function populateHeroData(data){
	//console.log(data.data[0]);
	options = createDataString(data);
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
	options = createDataString(data);
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
	console.log(data.data[0]);
	options = createDataString(data);
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
	console.log(data.data[0]);
	options = createDataString(data);
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
	options = createDataString(data);
	$(".jsVillainSelect").append(options);
}

function getVillains(){
	//html href
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
	//html href	
	console.log("Attempt to get menu");
	
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.Bearer
		},
		url: "/protected",
		success: getAuthSuccess,
		error: getAuthError
	};
	$.ajax(settings);
	
}

function initializeMenu(){
	//possibly have optional paramters so that can select for expansions
	//https://developer.marvel.com/
	//https://comicvine.gamespot.com/api/
	getMasterminds();
	getHeroes();
	getAuth();
	getSchemes();
	getHenchmen();
	getVillains();
}

$(initializeMenu);
//getMenu();