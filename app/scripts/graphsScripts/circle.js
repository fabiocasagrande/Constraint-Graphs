 /*
 * 
 * Fabio Casagrande
 * October 6, 2015
 *
 */
var circle={

			circle:"null",
			x:"null", 
			y:"null", 
			r:"null",
			txPos:"null",
			tyPos:"null",
			svgNS:"null", 
			text:"null",
			value:"null",
			id:"null",
};

 circle.drawCircle = function(){
      
    			this.svgNS = svg.namespaceURI;
				this.circle= document.createElementNS(this.svgNS,'circle');
				this.circle.setAttribute('cx',this.x);
				this.circle.setAttribute('cy',this.y);
				this.circle.setAttribute("r",this.r); 
				this.circle.setAttribute('fill','#95B3D7');
				this.circle.setAttribute('id',this.id);
				this.text=document.createElementNS(this.svgNS,'text');

				this.txPos=this.x;
				this.tyPos=this.y+3;

				if(this.value>9){
					this.txPos=this.txPos-8;
				}else{
					this.txPos=this.txPos-4;
				}
	   
	   
				this.text.setAttribute('x', this.txPos);
				this.text.setAttribute('y', this.tyPos);
				this.text.setAttribute('id',this.id+'value');
				this.text.textContent = this.value;
				this.text.style.stroke="red";
				svg.appendChild(this.circle);
				svg.appendChild(this.text);
				document.body.appendChild(svg);

}




 circle.draw_Circle = function(x,y,r,value){

			circle.x=x; 
			circle.y=y; 
			circle.r=r;
			circle.value=value;
			circle.id=value;
			circle.drawCircle();
			
}


