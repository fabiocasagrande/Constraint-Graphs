 
 /*
 * 
 * Fabio Casagrande
 * October 6, 2015
 *
 *
 */
 
 
 
var graphGenerator={
	
	alphabet : [["A"],["B"],["C"],["D"],["E"],["F"],["G"],["H"],["I"],["K"],["L"],["M"],["N"],["O"],["P"],["Q"],["R"],["S"],["T"],["U"],["V"],["W"],["X"],["Y"]["Z"]],
	letterSelector:0,
	numberId:0,
	minConstraintNumb: 2,
	maxConstraintNumb: 5,
	minCircleNumb: 3,
	maxCircleNumb: 6,
	maxLines: 14,
	actualS1Constraints: 0,
	actualS2Constraints: 0,
	actualTotConstraints:0,
	actualCircles:0,
	actualConnections: 0,
	connectionMatrix:'',
	conDimension: 25,
	radius:20,
	conNumbCount:0,
	totUnary:0,
	totBinary:0,
	totNoUB:0,
	setS1XPos:100,
	setS1YPos:100,
	setCXPos:100,
	setCYPos:200,
	setS2XPos:100,
	setS2YPos:300,
}

/*
*Generates a random integer
*/
 graphGenerator.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/*
*Set a total number of Constraints
*/
 graphGenerator.initConstraintSetNumb = function(){
	this.actualS1Constraints=this.getRandomInt(this.minConstraintNumb,this.maxConstraintNumb);
	this.actualS2Constraints=this.getRandomInt(this.minConstraintNumb,this.maxConstraintNumb);
	this.actualTotConstraints=this.actualS1Constraints+this.actualS2Constraints;
}
 

/*
*Set a total numbers of Circles
*/
 graphGenerator.initCircleSetNumb = function(){
	this.actualCircles = this.getRandomInt(this.minCircleNumb,this.maxCircleNumb);
}

/*
*Set the total numbers of Connections between Constraints and Circles
*/
graphGenerator.initConnectionsNumb = function(){
	this.actualConnections = this.getRandomInt((this.actualTotConstraints+this.actualCircles),this.maxLines);	
}

/*
*Initialize the connection matrix [constraint][circle] with all cells set to 0, meaning no connection
*/
graphGenerator.initMatrix = function(){
	
	this.connectionMatrix=new Array(this.actualCircles);
	for(var l=0; l<this.actualCircles; l++){
		this.connectionMatrix[l]=new Array(this.actualTotConstraints);
	}

	for(var i=0;i<this.actualCircles;i++){
		for(var k=0;k<this.actualTotConstraints;k++)
			this.connectionMatrix[i][k]=0;
	}
}

/*
*Return a letter of the alphabet
*/
graphGenerator.getLetter = function(){

 if(this.letterSelector==this.alphabet.length){
	 this.letterSelector=0;
 }
 return this.alphabet[this.letterSelector++];
}




/*
*Draws the first top set of constraints
*/
graphGenerator.drawfirstConstraintSet = function(){
	
	for(var i=0;i<this.actualS1Constraints;i++){
		
		square.draw_Square(this.conDimension,this.conDimension,this.setS1XPos,this.setS1YPos,this.conNumbCount);
		this.setS1XPos=this.setS1XPos+80;
		this.conNumbCount=this.conNumbCount+1;
	
	}
}

/*
*Draws the second bottom set of constraints
*/
graphGenerator.drawSecondConstraintSet = function(){
	
	for(var i=0;i<this.actualS2Constraints;i++){
		
		square.draw_Square(this.conDimension,this.conDimension,this.setS2XPos,this.setS2YPos,this.conNumbCount);
		this.setS2XPos=this.setS2XPos+80;
		this.conNumbCount=this.conNumbCount+1;
	
	}
}


/*
*Draws the middle set of circles
*/
graphGenerator.drawCircleSet = function(){
	
	for(var i=0;i<this.actualCircles;i++){
		
		circle.draw_Circle(this.setCXPos,this.setCYPos,this.radius,this.getLetter());
		this.setCXPos=this.setCXPos+80;
	
	}
}


/*
*generates connctions constraints
*/

graphGenerator.initConnections = function(){
	
	for(var i=0;i<this.actualConnections;i++){
	this.connectionMatrix[this.getRandomInt(0,this.actualCircles)][this.getRandomInt(0,this.actualTotConstraints)]=1;
	}

}


/*
*Draws connctions among circles and constraints
*/
graphGenerator.drawConnections = function(){
	var count=0;
	for(var i=0; i<this.actualCircles; i++){
		for(var j=0; j<this.actualTotConstraints; j++){
			
			if(this.connectionMatrix[i][j]==1){
				
				if(j<this.actualS1Constraints){
				
				line.draw_Line(document.getElementById(this.alphabet[i]).getAttribute("cx"),
				(parseInt(document.getElementById(this.alphabet[i]).getAttribute("cy"))-this.radius),
				(parseInt(document.getElementById(j).getAttribute("x"))+this.conDimension/2),
				(parseInt(document.getElementById(j).getAttribute("y"))+this.conDimension),count++);
				
				}
				else{
					
				line.draw_Line(document.getElementById(this.alphabet[i]).getAttribute("cx"),
				(parseInt(document.getElementById(this.alphabet[i]).getAttribute("cy"))+this.radius),
				(parseInt(document.getElementById(j).getAttribute("x"))+this.conDimension/2),
				(parseInt(document.getElementById(j).getAttribute("y"))),count++);

				}
			}
						
		}
		
	}
	
	this.actualConnections=count;
	
}

/*
*Checks for unary and binary constraints
*/
graphGenerator.checkUniBinaryConstraints = function(){
	
	var count=0;
	var binary=0;
	var unary=0;
	var not=0;
	
	for(var i=0;i<this.actualTotConstraints;i++){
		count=0;
		
		for(var k=0;k<this.actualCircles;k++){
		
			if(this.connectionMatrix[k][i]==1){
				count=count+1;
			}
		}
		
		
		if(count==1){
			unary=unary+1;
		}
		
	    if(count==2){
			binary=binary+1;
		}

		if(count>2 || count==0){
			not=not+1;
		}
	
		
	}
	
	this.totUnary=unary;
	this.totBinary=binary;
	this.totNoUB=not;
	
	
}

/*
*Remove Circles from screen
*/
graphGenerator.clearCircles = function (){
	
	var parent=document.getElementById("svg");
	
	
	for(var i=0;i<this.actualCircles;i++){
		
		var child =document.getElementById(this.alphabet[i]);
	    parent.removeChild(child);
		var lett=this.alphabet[i]+"value";
		child=document.getElementById(lett);
		parent.removeChild(child);
		
	}
}


/*
*Remove constraints from screen
*/
graphGenerator.clearConstraints = function (){
	
	var parent=document.getElementById("svg");
	
	
	for(var i=0;i<this.actualTotConstraints;i++){
		var child =document.getElementById(i);
	    parent.removeChild(child);
		var lett=i+"value";
		child=document.getElementById(lett);
		parent.removeChild(child);
		
	}
}

/*
*Remove connections from screen
*/
graphGenerator.clearConnections= function (){
	
	var parent=document.getElementById("svg");
	for(var i=0;i<this.actualConnections;i++){
	var child =document.getElementById(i);
	parent.removeChild(child);
	}	
}

/*
*Reset values
*/
graphGenerator.clearValues= function (){
	
	this.letterSelector=0;
	this.numberId=0;
	this.minConstraintNumb= 2;
	this.maxConstraintNumb= 5;
	this.minCircleNumb= 3;
	this.maxCircleNumb= 6;
	this.maxLines= 14;
	this.actualS1Constraints= 0;
	this.actualS2Constraints= 0;
	this.actualTotConstraints=0;
	this.actualCircles=0;
	this.actualConnections= 0;
	this.connectionMatrix='';
	this.conDimension= 25;
	this.radius=20;
	this.conNumbCount=0;
	this.totUnary=0;
	this.totBinary=0;
	this.totNoUB=0;
	this.setS1XPos=100;
	this.setS1YPos=100;
	this.setCXPos=100;
	this.setCYPos=200;
	this.setS2XPos=100;
	this.setS2YPos=300;
	
}

/*
*Initializes connctions circles and constraints
*/

graphGenerator.init = function(){
	
	this.initConstraintSetNumb();
	this.initCircleSetNumb();
	this.initMatrix();
	this.initConnectionsNumb();
	this.initConnections();
	
}


/*
*Draws the whole graph
*/
graphGenerator.draw =function (){
	
	this.drawfirstConstraintSet();
	this.drawCircleSet();
	this.drawSecondConstraintSet();
	this.drawConnections();
	
}

/*
*checks for constraint types
*/
graphGenerator.check =function (){
	this.checkUniBinaryConstraints();
}


//----------------------------------------------Main Functions--------------------


/*
*Draws graph on screen
*/
graphGenerator.generate = function(){
	
	this.init();
	this.draw();
	this.check();
	
}

/*
* Reset graph
*/
graphGenerator.clear = function(){
	
	this.clearCircles();
	this.clearConstraints();
	this.clearConnections();
	this.clearValues();
	
	
}
