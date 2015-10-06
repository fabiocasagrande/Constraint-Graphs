 /*
 * 
 * Fabio Casagrande
 * October 6, 2015
 *
 */
var square={
	        square:"null",
			x:"null", 
			y:"null", 
			txPos:"null",
			tyPos:"null",
			txtPosX:'null',
			txtPosY:'null',
			svgNS:"null", 
			text:" ",
			value:" ",
			id:"null",
}

square.drawSquare = function(){
	
	            this.svgNS = svg.namespaceURI;
				this.square= document.createElementNS(this.svgNS,'rect');
				this.square.setAttribute('x',this.txPos);
				this.square.setAttribute('y',this.tyPos);
				this.square.setAttributeNS(null, 'height', this.x);
                this.square.setAttributeNS(null, 'width', this.y);
				this.square.setAttribute('fill','#95B3D7');
				this.square.setAttribute('id',this.id);
				this.text=document.createElementNS(this.svgNS,'text');
				this.txtPosX=this.txPos+(this.x/2.4);
				this.txtPosY=this.tyPos+(this.y/1.9);
				if(this.value>9){
					this.txPos=this.txPos-8;
				}else{
					this.txPos=this.txPos-4;
				}
				this.text.setAttribute('x', this.txtPosX);
				this.text.setAttribute('y', this.txtPosY);
				this.text.setAttribute('id',this.id+'value');
				this.text.textContent = this.value;
				this.text.style.stroke="red";
				svg.appendChild(this.square);
				svg.appendChild(this.text);
				document.body.appendChild(svg);

}


 square.draw_Square = function(x,y,xPos,yPos,ID){

			
			square.x=x; 
			square.y=y;
			square.txPos=xPos;
			square.tyPos=yPos;
			square.id=ID;
			square.drawSquare();
			
}