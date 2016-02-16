//var main = main || {};
//main($) = {
//	"use strict";
	
	$(document).ready(function() {
		commonInitializations();
		
		$('#submittedDate').html(getCurrentTimestampFormatted());

		$('#voteButton').click(function(){
			var $voteCount = $('#voteCount');
			$voteCount.html(parseInt($voteCount.html()) + 1);
			$voteCount.addClass('highlight');
			
			$(this).hide();
			$('#votedButton').removeClass('hidden');
		});
		
		$('#questionField').on('blur focus', function() {$('#characterCount').toggleClass('hidden')})
						   .keyup(function() {$('#currentCharacterCount').html($('#questionField').val().length)});

		$('#submitButton').click(addQuestion);
		fillQuestions();		
	});

	/**
	* These will be run in the ready() of every page, so I'm grouping them together.
	*/
	function commonInitializations() {
		initializeParse();
		checkCredentials();
		$('#logoutLink').click(logout);
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
	
	/*
	 * Returns a string of a timestamp in the format "8:45 pm  9/11/01"
	*/
	function getCurrentTimestampFormatted() { // see http://stackoverflow.com/a/12409344
		var today = new Date();
		
		var hours = today.getHours();
		var isMorning = hours < 12;
		var period = (isMorning) ? "am" : "pm"; // ternary operator
		
		if (hours >= 13) { // no military time
			hours -= 12;
		}
		
		var minutes = today.getMinutes();
		if (minutes < 10) { // enforce two digits
			minutes = '0' + minutes.toString();
		}
		
		var timeFormatted = hours + ':' + minutes + ' ' + period;
		
		var spacing =  '\u00A0' + '\u00A0';
			
		var days = today.getDate();
		var months = today.getMonth() + 1; //January is 0!
		var year = today.getFullYear().toString().substr(2, 2);
		var dateFormatted = days + '/' + months + '/' + year;
	   
		return timeFormatted + spacing + dateFormatted;
	}

	function addQuestion() {
		 event.preventDefault();
		 initializeParse();
		
		 var Question = Parse.Object.extend("Question");
		 var newQuestion = new Question();
		 var questionText = $('#questionField').val();
		 var currentUser = Parse.User.current().get("username");
		 
		 console.log("questionText = " + questionText);
		 console.log("currentUser = " + currentUser);
				 
		 newQuestion.set("voteCount", 0);
		 newQuestion.set("createdBy", currentUser); // Parse.User.current()
		 newQuestion.set("questionText", questionText); // $('#questionField').val()
		 
		 newQuestion.save(null, {
		 success: function(newQuestion) {
			 // Execute any logic that should take place after the object is saved.
			 // reload page
			 console.log("worked");
			 location.reload();
		 },
		 error: function(newQuestion, error) {
			 // Execute any logic that should take place if the save fails.
			 // error is a Parse.Error with an error code and message.
			 alert('Failed to create new object, with error code: ' + error.code + error.message);
			console.log("did not work");
		 }
		 });
	}

	function fillQuestions() {
		//Parse Query to get questions
		initializeParse();
		var QuestionQuery = Parse.Object.extend("Question");
		var query = new Parse.Query(QuestionQuery);
		query.descending("createdAt"); // sets the 'ORDER BY' SQL
		query.find({
			success: function(results){							
				for (var i = 0; i < results.length; i++) {
					$("#questionText"  + i).html(results[i].get('questionText'));
					$("#voteCount"     + i).html(results[i].get('voteCount'));
					$("#submittedDate" + i).html(results[i].get('createdAtDate'));
				}
			},
			error: function(error) {
				console.log("Error " + error.code + " " + error.message);
			}
		});
	}
	
	function logout() {
		if (confirm('Are you sure you want to log out?')) {
			Parse.User.logOut();
			window.location.href = "index.html";
		}
	}
	
	/*
	 * Shortcut to initialize Parse.
	 */
	function initializeParse() {
		Parse.initialize("A28UnwHZNiBrRgNc9HzRhZk8F8FEZBhsrllFYa6C", "8EdGFQGKbgwUzuCb15zcjr7u2TMdjIKI0e4sZnyY");	
	}

	function testParse() {
		var TestObject = Parse.Object.extend("TestObject");
		var testObject = new TestObject();
		
		testObject.save({foo: "bar"}).then(function(object) {
		alert("Parse is initialized.");
		});
	}
//} return {commonInitializations : commonInitializations,
//		  testParse : testParse}