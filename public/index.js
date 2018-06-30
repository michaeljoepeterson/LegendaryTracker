const test="test";

function getMenuSuccess(data){
	console.log("Menu Access");
	//console.log(data);
	//window.location.href = "/protected/";
	//if I do this then everything will bassically be the same page which sort of solves the jwt problem
	document.write(data);
}

function getMenuError(err){
	console.log("Menu failed");
	console.log(err);
}

function getMenu(key){
	//html href
	
	console.log("Attempt to get menu");
	sessionStorage.setItem("Bearer", key);
	const settings = {
		method: "GET",
		headers:{ 
			"Authorization": 'Bearer ' + key
		},
		url: "/protected",
		success: getMenuSuccess,
		error: getMenuError
	};
	$.ajax(settings);
	
}

function userLogin(data){
	console.log("Give key");
	//window.location.href = "/protected/menu.html";
	const authKey = data.authToken;
	getMenu(authKey);
}

function loginError(err){
	console.log(err);
	console.log("error");
	if (err.statusText === "Unauthorized"){
		alert("Username or password incorrect");
	}
}

function loginUser(user){
	console.log("user logged in");
	const settings = {
		method: "POST",
		url: "/api/auth/login",
		data: JSON.stringify(user),
		success: userLogin,
		error: loginError,
		dataType: 'json',
		contentType: 'application/json'
	};
	$.ajax(settings);
}

function userAdded(data){
	console.log(data);
	console.log("created");
	alert("User Created!");
	$(".jsVerifyPassword").empty();
	$("#usernameInput").val("");
	$("#passwordInput").val("");
	$(".jsHeader").text("Login");

}
function userError(err){
	console.log(err);
	console.log('error');
	console.log(err.responseJSON.message);
	const errorMsg = err.responseJSON.message;
	if (errorMsg === "Illegal Character"){
		const location = err.responseJSON.location;
		alert(`Illegal character used in ${location} please try again`);

	}
	else if(errorMsg === "Missing Field"){
		alert("Please fill out all fields");
	}
	else if (errorMsg === "Incorrect field type: expected string"){
		alert("Expected strings only");
	}
	else if(errorMsg === "Cannot start or end with whitespace"){
		const location = err.responseJSON.location;
		alert(`${location} cannot start or end with a space`);
	}
	else if(errorMsg.search("Must be at") !== -1){
		const location = err.responseJSON.location;
		if (location === "password"){
			alert(`${location} must be at least 10 characters long and at most 72 characters long`);
		}
		else if(location === "username"){
			alert(`${location} must be at least 1 characters long and at most 50 characters long`);
		}
		
	}
	else if(errorMsg === "Extra Field"){
		alert("Only fill out supplied fields");
	}
	else if("Username taken"){
		alert("Username already taken");
	}
	else{
		alert("Internal server error");
	}
}
function addUser(user){
	console.log("user added");
	const settings = {
		method: "POST",
		url: "/api/users",
		data: JSON.stringify(user),
		success: userAdded,
		error: userError,
		dataType: 'json',
		contentType: 'application/json'
	};
	$.ajax(settings);
}

function submitClicked(){
	$(".jsSignupForm").submit(function(event){
		event.stopImmediatePropagation();
		event.preventDefault();

		const userName = $("#usernameInput").val();
		const pwd = $("#passwordInput").val();
		const pwdVerify = $("#verifyInput").val();
		if (pwdVerify === undefined){
			
			const userData = {
				username: userName,
				password: pwd
			};
			sessionStorage.setItem("user", userData.username);
			loginUser(userData);
		}	
		else if (pwdVerify !== undefined && pwd === pwdVerify){
			const userData = {
				username: userName,
				password: pwd
			};
			addUser(userData);
		}
		else if(pwdVerify !== undefined && pwd !== pwdVerify){

			alert("Passwords do not match");
		}
	});
		
}

function generateSignUpString(){
	const htmlString = `<label for="verifyInput">Confirm Password:</label>
		<input type="Password" id="verifyInput">`;
	return htmlString;
}

function loginClicked(){
	$(".jsLoginLink").click(function(event){
		event.preventDefault();
		$(".jsVerifyPassword").empty();
		$(".jsHeader").text("Login");
	});
}

function createSignUp(){
	$(".jsSignUpLink").click(function(event){
		//event.stopImmediatePropagation();
		event.preventDefault();
		$(".jsVerifyPassword").empty();
		$(".jsHeader").text("Sign up");
		const signupString = generateSignUpString();
		$(".jsVerifyPassword").append(signupString);
	});	
	submitClicked();
	loginClicked();
}

$(createSignUp);
