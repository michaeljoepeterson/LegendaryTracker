
function logOut(){
	$(".jsLogout").click(function(event){
		event.preventDefault();
		sessionStorage.setItem("Bearer", "");
		sessionStorage.setItem("user", "");
		window.location.href = "/index.html";
	});
}

$(logOut);