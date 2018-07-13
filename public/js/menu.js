//console.log(sessionStorage.getItem("Bearer"));
//console.log(sessionStorage.getItem("user"));

let MD5 = function(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

let expansionObj = {
	"base":true,
	"Dark City":true
};

let heroChoice1;
let imgUrl;
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

function getCharacterSuccess(data){
	console.log(data);
	if (data.data.results.length === 0){
		console.log("no data");
		imgUrl = "images/cardback.jpg";
	}
	else{
		let finalImgUrl = data.data.results[0].thumbnail.path + "/portrait_xlarge" + "." + data.data.results[0].thumbnail.extension;
		console.log(finalImgUrl);
		imgUrl = finalImgUrl;
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
	
}

function getCharacterError(err){
	console.log(err);
}

function getKeySuccess(data){
	let endUrl = "http://gateway.marvel.com/v1/public/characters";
	let d = new Date();
	let timeStamp = d.getTime();
	timeStamp = timeStamp.toString();
	let m5Hash = MD5(timeStamp + data.privatekey+data.publickey);
	const settings = {
		method: "GET",
		url: endUrl,
		data:{
			"apikey":data.publickey,
			"ts": timeStamp,
			"hash":m5Hash,
			name:heroChoice1
		},
		success: getCharacterSuccess,
		error: getCharacterError
	};
	$.ajax(settings);
}

function getKeyError(err){
	console.log(err);
	if(err.responseText === "Unauthorized"){
		window.location.href = "/index.html";
	}
}

function getKey(){
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + sessionStorage.getItem("Bearer")
		},
		url: "/api/users/key",
		success: getKeySuccess,
		error: getKeyError
	};
	$.ajax(settings);
}

function getCharServerSuccess(data){
	console.log(data);
	if (data.error === "No results"){
		console.log("no data");
		imgUrl = "images/cardback.jpg";
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
		imgUrl = finalImgUrl;
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
}

function getCharServerError(err){
	console.log(err);
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
		getKey();
		
	});
	$(".jsHeroSelect2").change(function(){
		let selectedVal = $(this).find(':selected').val();
		console.log(selectedVal);
		//console.log(MD5("1abcd1234"))
		heroChoice1 = selectedVal;
		choice = 2;
		getKey();
		
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