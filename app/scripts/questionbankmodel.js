
	
/*
 * Stores the questions, answers and the answer history
 */

function QuestionBankModel(_simModel, _numerator, _denominator) {
	
	// save a link to the model
	this.simModel = _simModel;	
	// the number of questions the student needs to answer right...
	this.numerator = _numerator;
	// out of this many of the most recent questions asked
	this.denominator = _denominator;
	// we need to keep track of the last <x> answers we've gotten
	// so we can test for mastery. we use an array as a queue that
	// stores as many answers as we're willing to consider
	this.resetAnswerHistory();
	
}
		

	
	








QuestionBankModel.prototype.resetAnswerHistory = function() {
	// start with an empty array
	this.answerHistory = [];
	// push a bunch of null objects into the history to represent questions
	// that haven't been asked yet
	for (var i = 0; i < this.denominator; i++) {
		this.answerHistory.push(null);
	}
}


/*
 * Add a new item to the back of the answer history, pull an item off
 * the front. Since the queue starts out filled with nulls, it is always
 * the same size.
 */
QuestionBankModel.prototype.updateAnswerHistory = function(newAnswer) {
	// add a new item to the back of the answer history
	this.answerHistory.push(newAnswer);
	// pull the oldest item off the front
	this.answerHistory.shift();
}


/*
 * Look at the answer history to see if we have met the criterion for
 * demonstrating mastery
 */
QuestionBankModel.prototype.masteryAchieved = function() {
	// count up the number of right answers
	var count = 0;
	// loop through the answer history
	for (var i = 0; i < this.answerHistory.length; i++) {
		// if we got the question right
		if (this.answerHistory[i]) {
			// increase our count
			count += 1;
		}
	}
	// compare the correct count to our goal
	return count >= this.numerator;
}

QuestionBankModel.prototype.temp = new Array(5);
var m=0;





QuestionBankModel.prototype.checkSingleAnswer = function (answe,integ) {
	
	if (this.answers[integ].toString().toLowerCase() == answe.toString().toLowerCase()){
		return true;
	}else{
		return false;
	}
}


/*
 * Compare the student's answer to the correct answer(s).
 */
QuestionBankModel.prototype.checkAnswer = function (one,two,three,four,five) {
	/*
	studentAnswer=studentAnswer.replace(/\s/g, '');
	for (var i = 0; i < this.answers.length; i++) {
		if (this.answers[i].toString().toLowerCase() == studentAnswer.toString().toLowerCase()) {
		
			//return true;
		}
	}
	*/
	var count=0;
	one=one.replace(/\s/g, '');
	two=two.replace(/\s/g, '');
	three=three.replace(/\s/g, '');
	four=four.replace(/\s/g, '');
	five=five.replace(/\s/g, '');

	this.temp[0]=this.checkSingleAnswer(one,0);
	this.temp[1]=this.checkSingleAnswer(two,1);
	this.temp[2]=this.checkSingleAnswer(three,2);
	this.temp[3]=this.checkSingleAnswer(four,3);
	this.temp[4]=this.checkSingleAnswer(five,4);
	
	
	
	
	
	for (var i = 0; i < this.answers.length; i++) {
		
		if (this.temp[i]==true) {
			
			count=count+1;
		}
		
	}
	
	
	
	
	
	
	if(count==5){
		
		return true;
	}
	else{
		
		return false;
		
	}
	
	
	
}
var ans={
	a1:'',
	a2:'',
	a3:'',
	a4:'',
	a5:'',
}

/*
 * choose a random template and useit to construct a new question string
 */
 
QuestionBankModel.prototype.chooseQuestion = function() {
	
	graphGenerator.generate();
	ans.a1=graphGenerator.actualCircles;
	ans.a2=graphGenerator.actualTotConstraints;
	ans.a3=graphGenerator.totNoUB;
	ans.a4=graphGenerator.totUnary;
	ans.a5=graphGenerator.totBinary;
	
	this.question ="Given: ~ ^^^^^^^^^^^^^^^^^^ val e = "+this.quest1+"  ~~ What is the value of " +this.quest2+" ? ";
	return this.question;
	

	}

QuestionBankModel.prototype.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



/*
 * Set the answer(s) to the question indicated by questionIndex.
 * Right now I'm using a really clunky approach. I'm sure there's
 * a better way.
 */
QuestionBankModel.prototype.setAnswers = function() {
	// Reset answers array
	this.answers = [];
	//push the answer in
	this.answers.push(ans.a1);
	this.answers.push(ans.a2);
	this.answers.push(ans.a3);
	this.answers.push(ans.a4);
	this.answers.push(ans.a5);
	
	
}
