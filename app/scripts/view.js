/*
 * main.js
 * Rich Simpson
 * August 5, 2015
 *
 * This code implements a mastery-based exercise on graph
 * theory for integration with Smart Sparrow.
 *
 * This is our view - The V in MVC
 */


/*
 * This object handles drawing the interface on the screen. Mostly
 * this involves drawing the actual graph and clearing out the
 * text field for the user's answer
 */
function SimView(_controller) {
	// keep a link to the controller
	this.controller = _controller;
	// Only set up the controls once
	this.setupControls();
	// create the question bank view - where questions and answer history are
	// displayed
	this.questionBankView = new QuestionBankView(this);
	// create the fringe view - a table with contents of fringe
	this.fringeView = new FringeView(this);
}


SimView.prototype.setupControls = function() {
	$( "#btnStart" ).click(function() {
		// finish initializing the app
		simController.initializeController();
		// disable start button
		$( "#btnStart" ).prop('disabled', true);
		// enable submit button
		$( "#btnSubmit" ).prop('disabled', false);
		
		document.getElementById("firstQ").style.display = "block";
		document.getElementById("secondQ").style.display = "block";
		document.getElementById("thirdQ").style.display = "block";
		document.getElementById("fourthQ").style.display = "block";
		document.getElementById("fifthQ").style.display = "block";
		
		document.getElementById("firstA").style.display = "block";
		document.getElementById("secondA").style.display = "block";
		document.getElementById("thirdA").style.display = "block";
		document.getElementById("fourthA").style.display = "block";
		document.getElementById("fifthA").style.display = "block";
		
		document.getElementById("hPos").style.display = "block";
		//document.getElementById("txtAnswer").style.display = "block";
		document.getElementById("btnSubmit").style.display = "block";
		document.getElementById("btnNextQuestion").style.display = "block";
		document.getElementById("intro").style.display = "none";
		document.getElementById("btnStart").style.display = "none";
		document.getElementById("uppart").style.display = "block";
	});
	// add event handler for submit button
	$( "#btnSubmit" ).click(function() {
		// check the answer
		//var studentAnswer = $( "#txtAnswer" ).val();
		var one = $( "#firstA" ).val();
		var two = $( "#secondA" ).val();
		var three = $( "#thirdA" ).val();
		var fourth = $( "#fourthA" ).val();
		var fifth = $( "#fifthA" ).val();
		
		
		// record whether it was right or wrong
		var rightAnswer = simController.simModel.questionBank.checkAnswer(one,two,three,fourth,fifth);
		
		// store the results
		simController.simModel.questionBank.updateAnswerHistory(rightAnswer);
		// draw the results for the last five questions
		simController.simView.questionBankView.drawAnswerHistory(simController.simModel.questionBank.answerHistory);
		// if they got the right answer
		
		var t=1;
		
		for(var i=0;i<simController.simModel.questionBank.temp.length;i++){
			
			if(simController.simModel.questionBank.temp[i]==true){
				
				$( "#txtFeedback"+(t++) ).html("Right. The answer is " + simController.simModel.questionBank.answers[i]);
				
			}else{
				
				$( "#txtFeedback"+(t++) ).html("That is incorrect. The correct answer is " + simController.simModel.questionBank.answers[i]);
				
				
			}
			
			
			//console.log(simController.simModel.questionBank.temp[i]);
			
		}
		
		
		
		
		
		/*
		if (rightAnswer) {
			// give them feedback
			$( "#txtFeedback1" ).html("Right. The answer is " + one);
			$( "#txtFeedback2" ).html("Right. The answer is " + two);
			$( "#txtFeedback3" ).html("Right. The answer is " + three);
			$( "#txtFeedback4" ).html("Right. The answer is " + fourth);
			$( "#txtFeedback5" ).html("Right. The answer is " + fifth);
			
		} else {
			// give them feedback
			$( "#txtFeedback1" ).html("That is incorrect. The correct answer is " + simController.simModel.questionBank.answers[0]);
			$( "#txtFeedback2" ).html("That is incorrect. The correct answer is " + simController.simModel.questionBank.answers[1]);
			$( "#txtFeedback3" ).html("That is incorrect. The correct answer is " + simController.simModel.questionBank.answers[2]);
			$( "#txtFeedback4" ).html("That is incorrect. The correct answer is " + simController.simModel.questionBank.answers[3]);
			$( "#txtFeedback5" ).html("That is incorrect. The correct answer is " + simController.simModel.questionBank.answers[4]);
		}
		
		*/
		
		// has mastery been demonstrated?
		if (simController.simModel.questionBank.masteryAchieved()) {
			// set the mastery achieved flag
			simController.setModelValue('mastery', 'true');
			// send the student a message
			console.log('victoia!!!');
			// tell Smart Sparrow to check the done condition
			
			document.getElementById("hPos").style.display = "none";
			//document.getElementById("txtAnswer").style.display = "none";
			document.getElementById("btnSubmit").style.display = "none";
			document.getElementById("btnNextQuestion").style.display = "none";
			document.getElementById("lblQuestion").style.display = "none";
			//document.getElementById("txtFeedback").style.display = "none";
			document.getElementById("history").style.display = "none";
			document.getElementById("outro").style.display = "block";
			document.getElementById("ok").style.display = "block";
			
		document.getElementById("uppart").style.display = "none";
		
			document.getElementById("firstQ").style.display = "none";
		document.getElementById("secondQ").style.display = "none";
		document.getElementById("thirdQ").style.display = "none";
		document.getElementById("fourthQ").style.display = "none";
		document.getElementById("fifthQ").style.display = "none";
		
		document.getElementById("firstA").style.display = "none";
		document.getElementById("secondA").style.display = "none";
		document.getElementById("thirdA").style.display = "none";
		document.getElementById("fourthA").style.display = "none";
		document.getElementById("fifthA").style.display = "none";
		
		
		
		
		
		
			simController.triggerCheck();
		} else {
			// enable next question button
			$( "#btnNextQuestion" ).prop('disabled', false);
		}
		// disable submit button
		$( "#btnSubmit" ).prop('disabled', true);
		// disable text field where the user enters an answer
		//$( "#txtAnswer" ).prop('disabled', true);
		$( "#firstA" ).prop('disabled', true);
		$( "#secondA" ).prop('disabled', true);
		$( "#thirdA" ).prop('disabled', true);
		$( "#fourthA" ).prop('disabled', true);
		$( "#fifthA" ).prop('disabled', true);
		
		
		
		
	});
	// call the submit button click-handler if the user hits the enter key
	/*
	$( '#txtAnswer' ).keypress(function(e){
			if(e.which == 13){//Enter key pressed
					$( '#btnSubmit' ).click();//Trigger search button click event
			}
	});
	*/
	$( '#firstA' ).keypress(function(e){
			if(e.which == 13){//Enter key pressed
					$( '#btnSubmit' ).click();//Trigger search button click event
			}
	});
	$( '#secondA' ).keypress(function(e){
			if(e.which == 13){//Enter key pressed
					$( '#btnSubmit' ).click();//Trigger search button click event
			}
	});
	$( '#thirdA' ).keypress(function(e){
			if(e.which == 13){//Enter key pressed
					$( '#btnSubmit' ).click();//Trigger search button click event
			}
	});
	$( '#fourthA' ).keypress(function(e){
			if(e.which == 13){//Enter key pressed
					$( '#btnSubmit' ).click();//Trigger search button click event
			}
	});
	$( '#fifthA' ).keypress(function(e){
			if(e.which == 13){//Enter key pressed
					$( '#btnSubmit' ).click();//Trigger search button click event
			}
	});
	
	
	
	
	
	
	
	
	// add event handler for next question button
	$( "#btnNextQuestion" ).click(function() {
		// disable next question button
		$( "#btnNextQuestion" ).prop('disabled', true);
		// enable submit button
		$( "#btnSubmit" ).prop('disabled', false);
		// erase the old question
		$( "#lblQuestion" ).text('');
		// enable text field where the user enters an answer
		//$( "#txtAnswer" ).prop('disabled', false);
		// empty the text field where the user enters an answer
		//$( "#txtAnswer" ).val('');
		
		$( "#firstA" ).prop('disabled', false);
		$( "#firstA" ).val('');
		// clear the feedback from the last question
		$( "#txtFeedback1" ).html('');
		
		$( "#secondA" ).prop('disabled', false);
		$( "#secondA" ).val('');
		$( "#txtFeedback2" ).html('');
		
		$( "#thirdA" ).prop('disabled', false);
		$( "#thirdA" ).val('');
		$( "#txtFeedback3" ).html('');
		
		$( "#fourthA" ).prop('disabled', false);
		$( "#fourthA" ).val('');
		$( "#txtFeedback4" ).html('');
		
		$( "#fifthA" ).prop('disabled', false);
		$( "#fifthA" ).val('');
		$( "#txtFeedback5" ).html('');
		
		
		// clear the fringe
		$( "#fringeTableDiv" ).html('');
		// pass off to the controller to create and display a
		// new graph and new question

		simController.setupDisplay();
	});
}
