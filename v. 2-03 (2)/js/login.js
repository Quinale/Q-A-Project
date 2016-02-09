	var parseKey1 = "A28UnwHZNiBrRgNc9HzRhZk8F8FEZBhsrllFYa6C";
	var parseKey2 = "8EdGFQGKbgwUzuCb15zcjr7u2TMdjIKI0e4sZnyY";

	$(document).ready(function() {
//			main.commonInitializations(); // use this once Will gets closures working
		// Remove the following once the above line works ----------
		commonInitializations();
		// ------------------------------------------------------
			console.log("ready() function");
			$('#submitButton').click(login);

			enableDisableSubmitButton();
			$('.loginFields').on('input', enableDisableSubmitButton); // not keyup, see http://stackoverflow.com/a/24746108
	});

	function commonInitializations() {
		initializeParse();
		checkCredentials();		
		$('#logoutLink').click(logout);
	}
	
	function checkCredentials() { // logging is for testing purposes only.
			//if (window.location.href === "index.html") {return;}	
			if ($('#pageId').html().toUpperCase() === "LOGIN") {
				return;
			}
			console.log("Current user is " + Parse.User.current());		
			if (Parse.User.current()) {
				console.log("User is logged in.");
			} else {
				$(document.body).hide();
				console.log("User is not logged in.");
				window.alert("Hey...you're not logged in.");
			//	window.location.href = "index.html"; // commenting this out to test something real quick
			}
		}
	
	function login(evt) {
		evt.preventDefault();
		console.log("in login() function");	

		initializeParse(); // in the future these will be shared from main.js, and we can remove them.
		var userNameField = $('#userNameField').val();
		var passwordField = $('#passwordField').val();		
		console.log(userNameField, passwordField);

		Parse.User.logIn(userNameField, passwordField, {
			success: function(user) {
				console.log("in ajax success");
				window.alert("Logged in successfully. Redirecting now...");
				window.location.href = "sessionLobby.html";
			},
			error: function(user, error){
				console.log("in ajax error");
				errorHandler(error);
			}
		});
	}

	function errorHandler(error) {
		// TODO: add some red text or something to #loginFieldsDiv html
		$('#loginError').removeClass("hidden");		
		$('.loginFields').addClass('error');
		console.log(error.code, error.message)
//		window.alert("Your lack of credentials disturb me.");
	}

	function enableDisableSubmitButton() {
		console.log("enableDisableSubmitButton() called");
		var userNameLength = $('#userNameField').val().length;
		var passwordLength = $('#passwordField').val().length;
		
		var bothFieldsFilledIn = (userNameLength > 0) && (passwordLength > 0);
		$('#submitButton').prop('disabled', !bothFieldsFilledIn);
	}	

	/* // in the future these will be shared from main.js, and we can remove them.
	 * Shortcut to initialize Parse.
	 */
	function initializeParse() {
		Parse.initialize(parseKey1, parseKey2);	
	}

	function testParse() {
		var TestObject = Parse.Object.extend("TestObject");
		var testObject = new TestObject();
		
		testObject.save({foo: "bar"}).then(function(object) {
		alert("Parse is initialized.");
		});
	}
	
	function logout() {
		if (confirm('Are you sure you want to log out?')) {
			Parse.User.logOut();
			window.location.href = "index.html";
		}
	}