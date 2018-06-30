//console.log(sessionStorage.getItem("Bearer"));
//console.log(sessionStorage.getItem("user"));

function populateMastermindData(data){
	console.log(data.data[0]);
	let options;
	for (let i = 0;i < data.data.length;i++){
		console.log(data.data[i].name);
		options += `<option value="${data.data[i].name}">${data.data[i].name}</option>`;
	}
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
//getMenu();