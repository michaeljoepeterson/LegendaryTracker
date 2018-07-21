
function logOut(){
	$(".jsLogout").click(function(event){
		event.preventDefault();
		console.log("logout clicked");
		sessionStorage.setItem("Bearer", "");
		sessionStorage.setItem("user", "");
		window.location.href = "/index.html";
	});
}

$(logOut);