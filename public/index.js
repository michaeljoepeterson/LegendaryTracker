function loginUser(user){
	console.log("user logged in");
}

function userAdded(data){
	console.log(data);
	console.log("created");
}
function userError(err){
	console.log(err);
	console.log('error')
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
		event.preventDefault();
		const userName = $("#usernameInput").val();
		const pwd = $("#passwordInput").val();
		const pwdVerify = $("#verifyInput").val();
		if (pwdVerify === undefined){
			//then do some login stuff
			loginUser();
		}
		
		if (pwdVerify !== undefined && pwd === pwdVerify){
			
			const userData = {
				username: userName,
				password: pwd
			};
			addUser(userData);
		}
			
	});
}

function generateSignUpString(){
	const htmlString = `<label for="verifyInput">Confirm Password:</label>
		<input type="Password" id="verifyInput">`;
	return htmlString;
}

function createSignUp(){
	$(".jsSignUpLink").click(function(event){
		//event.stopImmediatePropagation();
		event.preventDefault();
		$(".jsVerifyPassword").empty();
		const signupString = generateSignUpString();
		$(".jsVerifyPassword").append(signupString);
	});	
	submitClicked();
}

$(createSignUp);
