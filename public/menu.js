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
	console.log(data.data[0]);
	options = createDataString(data);
	$(".jsHeroSelect1").append(options);
	$(".jsHeroSelect2").append(options);
	$(".jsHeroSelect3").append(options);
}

function getHeroes(){
	//html href
	console.log("get")
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
	console.log(data.data[0]);
	options = createDataString(data);
	$(".jsMastermindSelect").append(options);
}

function getMasterminds(){
	//html href
	console.log("get")
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

$(getMasterminds);
$(getHeroes);
//getMenu();