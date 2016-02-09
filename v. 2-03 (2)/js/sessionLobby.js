$(document).ready(function() {
	$('tr').on("mouseover mouseout", function() {
			var isHighlight = $(this).find("#element:hover").length &&  ($(this).attr('id') !== "tableHeaders");
			console.log("$(this).find('#element:hover').length) = " + $(this).find("#element:hover").length);
			 // ^ is(:hover) not working in FF. http://stackoverflow.com/a/16881434
			console.log("($(this).attr('id') !== 'tableHeaders') = " + ($(this).attr('id') !== "tableHeaders"));
			console.log("isHighlight = " + isHighlight);
			$(this).toggleClass("highlightTableRow", isHighlight);	
			commonInitializations();
	});
})

/**
	* These will be run in the ready() of every page, so I'm grouping them together.
	*/
	function commonInitializations() {
		initializeParse();
		checkCredentials();
		$('#logoutLink').click(logout);
	}
	
	/*
	 * Shortcut to initialize Parse.
	 */
	function initializeParse() {
		Parse.initialize("A28UnwHZNiBrRgNc9HzRhZk8F8FEZBhsrllFYa6C", "8EdGFQGKbgwUzuCb15zcjr7u2TMdjIKI0e4sZnyY");	
	}
	
	function checkCredentials() { // logging is for testing purposes only.
		if (window.location.href === "index.html") {return;}	
		console.log("Current user is " + Parse.User.current());		
		if (Parse.User.current()) {
			console.log("User is logged in.");
		} else {
			$(document.body).hide();
			console.log("User is not logged in.");
			window.alert("Hey...you're not logged in.");
			window.location.href = "index.html";
		}
	}
	
	function logout() {
		//console.log("Before popup");
		var confirmLogout = confirm('Are you sure you want to log out?');
		console.log("confirmLogout = " + confirmLogout);
		if (confirmLogout) {
			console.log("Before logout");
			Parse.User.logOut();
			//console.log("After Logout");
			window.location.href = "index.html";
		}
		console.log("After popup");
	}