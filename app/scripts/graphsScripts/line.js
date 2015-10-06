  /*
 * 
 * Fabio Casagrande
 * October 6, 2015
 *
 *
 */
 var line={ 
 
	x:"null", 
	y:"null", 
	x1:"null", 
	y1:"null", 
	svgNS:"null", 
	line:"null", 
	id:"null",
 }
 
 
 line.drawLine = function (){
	 
	this.svgNS = svg.namespaceURI;
	this.line= document.createElementNS(this.svgNS,'polyline');
	this.line.setAttribute('points', this.x + ',' + this.y + ',' + this.x1 + ',' + this.y1);
	this.line.setAttribute('id',this.id);
	this.line.style.stroke="blue";
	svg.appendChild(this.line);
	document.body.appendChild(svg);
 }

 line.draw_Line = function(fromX,fromY,toX,toY,value){

	line.x=fromX; 
	line.y=fromY;
	line.x1=toX;
	line.y1=toY;
	line.id=value;
	line.drawLine();
			
}

