//p5.disableFriendlyErrors = true;
//3D model object01_horse-low-blender.obj by KONDO Kunio 2022.06
// Tea pot data https://en.wikipedia.org/wiki/Utah_teapot
 
//p5.disableFriendlyErrors = true;

const sketch = (a) =>{
 
			let crayola;
			let wrapper;
			let crayons = [];
			let csize;
			let rand = 1;
			let diameter, spacing, weight, time;
			let period = 6;

			let far = 100;

			//declare array of shape objects
			let shapes = [];

			
			
			 a.preload = function() {
			
				Top = a.loadModel('asset/top.obj', true, a.loadingOk());
				Stretch = a.loadModel('asset/stretch.obj', true, a.loadingOk());
				Lift = a.loadModel('asset/lift.obj', true,a. loadingOk());
				Car = a.loadModel('asset/car.obj', true, a.loadingOk());
				Shelf = a.loadModel('asset/Shelf.obj', true, a.loadingOk());
				Cage = a.loadModel('asset/cage.obj', true, a.loadingOk());


				crayola = a.loadJSON('crayola.txt');
				wrapper = a.loadImage('cageWrapper.PNG');
				shelf = a.loadImage('shelf.png');
				sphereEnvironment = a.loadImage("sphere.jpg")
			
			};


  
			let myGraph;
			let myCanvas;
			let fpsDisplay;
			a.setup = function(){
				
				a.rectMode(a.CENTER);

				//a.pixelDensity(1);
				//the other boxes scene
				myCanvas = a.createCanvas(1920, 1080, a.WEBGL).GL;
			    //myCanvas.drawingContext.disable(myCanvas.drawingContext.DEPTH_TEST);
				//myCanvas.parent('sketch-div');
				myGraph = a.createGraphics(1920, 1080, a.WEBGL);
                

				fpsDisplay = a.createInput('0');
				fpsDisplay.position(20,20);
				

				csize = a.height / 24;


				let i = 0
				for (let z = -a.height / 3; z < a.height / 3; z += csize * 3) {
						for (let y = -a.height / 3; y < a.height / 6; y += csize * 3) {
							let tpos = a.createVector(-3.5 * csize, y*.9, z*.92);
							let pos = a.createVector(-2 * a.height, 0, 0);
							//crayons.push(new Crayon(pos, tpos, crayola.colors[i % crayola.colors.length].hex, crayola.colors[i % crayola.colors.length].color, csize * 0.7,  5.8* csize, i, crayola.colors[i % crayola.colors.length].pox, crayola.colors[i % crayola.colors.length].pox, crayola.colors[i % crayola.colors.length].poy, crayola.colors[i % crayola.colors.length].poz));
							crayons.push(new Crayon(pos, tpos, crayola.colors[i % 24].hex, crayola.colors[i % 24].color, csize * 0.7,  5.8 * csize, i, crayola.colors[i % 24].pox, crayola.colors[i % 24].poy, crayola.colors[i % 24].poz));
						
							i += 1;
						} 
					}
				
				
					orient = a.createVector(0, 0, 0);
					ovel = a.createVector(-0.05, 0.05, 0);
					zoom = 1;
					zvel = 0;

				



					//currCamera = a.createCamera();
					devPlaceLocation = a.createVector(0, 0, 0);
					carPos = a.createVector(50,0,600);
					liftPos = a.createVector(0,26,0);
					stre_scale = a.createVector(1,1,1);
					//facing = a.createVector(0,0,0);
					

					makeSelect();


					diameter = 0;
					spacing = 0;
					weight = 0;
					time = 0;

                   
					a.createRandomBoxes(10);
                 
			};

			



			//------- parameters----------

			 
			 

			/*const devPlaceLocation = { // where is the level editer placing a block
				x: 0,
				y: 0,
				z: 0,
			};*/


 
			let lastTime = 0;

            a.draw = function(){
           	 
				a.someDraw(a);
				//a.image(a,100,100);
				let t = a.millis();
				fpsDisplay.value(`${1000/(t-lastTime)}`);
				lastTime = t;
 
			};

            
            var flag_start = 0;
			var flag_moveCar = 0;
			var flag_moveCage = 0;
			var flag_moveLift = 0;
            var flag_moveTogether = 0;
			var flag_done = 0;

				
			a.someDraw = function(){
				
				

				 

				setupInstructions();
				

				a.background(0);
				a.noStroke();
			 
			    

				
			    a.orbitControl();
				//let camTheta = a.mouseX/1000;
				//a.camera(300 * a.sin(camTheta)+carPos.x, 300 - a.mouseY, 300 * a.sin(camTheta)+carPos.z+530, 100, -60, 0, 0, 1, 0);
			   
				
				let camTheta = -6;
				a.camera(100 * Math.sin(camTheta)+carPos.x+900, -300 , 100 * Math.sin(camTheta)+carPos.z + 230, 300, -260, 400, 0, 1, 0);
 
			
			/////////////////////////////////////////////////////////////////////////////
			


			a.ambientLight(0,10,60);
			a.specularMaterial(255, 255, 255,30);
			a.pointLight(50, 150, 255, -500, 1000, -500);
			a.pointLight(50, 255, 255, 500, -1000, 500);
			a.strokeWeight(3);
			

			a.noStroke();
			 





			myCanvas.enable(a.CULL_FACE);
			myCanvas.cullFace(a.BACK);


			
			////////////////////////////////////////////////////////////////////////////
 

			shapes.forEach((x) => a.drawBox(x));
			shapes.forEach((x) => a.updateBox(x));


			//--------- car moving operating --------
			
			
			a.push();
				a.translate(0,0,0);
				a.rotateX(a.PI/2);
			    //a.textureWrap(a.REPEAT);
				//a.textureMode(a.IMAGE);
				//a.texture(sphereEnvironment);	   
				//a.sphere(2400);
				a.circle(0,0,7000);
			a.pop();
			
		
			//////////////////////////////////////////s///////////////////////////////
			 
			 
             
       
			/////////////////////////////// init and show the cages //////////////////////////////////////

			a.specularMaterial(255, 255, 255,150);
			a.push();
				a.scale(.8);
				a.translate(250,-170,400);
			 
				//a.rotateZ(a.PI/2);
					for (let c of crayons) {
							if (a.frameCount > c.id) 
								c.move();
							c.show();
						}
			a.pop();


			if(flag_start == 1)
			if(flag_moveTogether!=1)
				carPos.lerp(50, 0, devPlaceLocation.z,.05);
			else {
				carPos.lerp(50, 0, 800,.03);
				//facing.lerp(0,a.PI/2,0,.05);
			 
			}

			if(a.dist(0, carPos.z,0,devPlaceLocation.z) < 10 && a.dist(0,carPos.z, 0,devPlaceLocation.z) > 0 && flag_moveLift!=1)   
			flag_moveCar = 1; // car's been ready now
		


		 

			if (carPos.mag() > 1000) {
			carPos = a.createVector(0, 0, -200);
			}





			let step =.01;    
			let amount = 0;
 
		

			//if( amount > 1 || amount < 0 ) step *= -1;
		
			// amount+=step;
			
			if(flag_moveCar == 1){					
				if(flag_moveCage!=1)	 
				liftPos.lerp(0, devPlaceLocation.y, 0, .05);//lift go up
                stre_scale.lerp(1,devPlaceLocation.y/30,1,.05);
				
			}
		



			a.push();

					a.rotateZ(a.PI); // change Y to opposite side // do not change 
						
					    a.push(); //axes
							a.stroke('red');
							a.line(0,0,0,200,0,0);

							a.stroke('green');
							a.line(0,0,0,0,200,0);

							a.stroke('blue');
							a.line(0,0,0,0,0,200);
						a.pop();



                     

					a.push();
						a.scale(3);
						a.translate(0,83,100);
						//texture(shelf);
						a.model(Shelf);	  
					a.pop();

					a.push();
                           
					        

							a.scale(1);
							a.translate(-250,0,530);
							a.rotateY(a.PI);
							//texture(shelf);
							//translate(devPlaceLocation.x,-250,devPlaceLocation.z);
								

							a.translate(carPos.x,104,carPos.z-5);

						    
							 
							//a.rotateY(facing.y);
							

							a.push();
								a.translate(-30,-102,0);
								a.rotateX(a.PI/2);
								a.baseCircle();
							a.pop();

							a.model(Car); 
								


							a.push();
								a.scale(.5);
								 
								if(flag_moveCar == 0)
									a.translate(-160,-160,0);
								if(flag_moveCar == 1)
                               	    a.translate(-160, 3.9*liftPos.y-254, 0);
																  
								a.model(Lift);
							a.pop();



                            if(a.dist(0,liftPos.y,0,devPlaceLocation.y)<2 && a.dist(0,liftPos.y,0,devPlaceLocation.y)>0){

								flag_moveLift = 1;
								 
							}


			

							a.push();
								a.scale(.5);
								a.scale(1,stre_scale.y,1);
								console.log("scale:"+stre_scale.y);
								a.translate(-56,20,0);
								a.model(Stretch);
							a.pop();

							a.push();
								a.scale(.5);
								a.translate(-56,120,0);
								if(flag_moveCar == 0)
									a.translate(0,0,0);
								if(flag_moveCar == 1)
                               	    a.translate(0, 3.9*liftPos.y-94, 0);
								a.model(Top);
							a.pop();

					a.pop();
				
			a.pop();

			a.push();
					a.scale(.8);
					a.translate(250,-170,400);
					 
						for (let c of crayons) {
								if (a.frameCount > c.id) 							    
									c.move();
								c.show();
							}

						
						if(flag_moveLift == 1 ){
							 
							for(let c of crayons){
							 
								if(c.id == r){
									 
									 
									c.tpos.x = .2 * csize;//cage out
									
									if(a.dist(0,c.tpos.x,0,c.pos.x) < .2 && a.dist(0,c.tpos.x,0,c.pos.x) > 0){
										flag_moveLift = 0; //lift banned
										flag_moveCage = 1; //cage trigger
									}
								
								} 
								
							}
						}

                        let xx = 0;
						let xxx = 0;

						if(flag_moveCage == 1 ){

							liftPos.lerp(0,30,0,.2);  //lift down	
							stre_scale.lerp(1,1,1,.5);

							for(let c of crayons){
								 
								if(c.id == r){								 								 
									c.tpos.y = 82;//cage down		
									xx = c.tpos.y;
									xxx = c.pos.y;						 							 			
								} 			
							}
								if(a.dist(0, xx, 0, xxx)<.1 && a.dist(0, xx, 0, xxx)>0){ 
								flag_moveTogether = 1; //together trigger    
							 
							}
						}
						




						if(flag_moveTogether == 1 ){
							 
							for(let c of crayons){
								 
								if(c.id == r){
 
									c.tpos.y = 82;					 
									c.tpos.z = -700;//cage gone

								} 
								
							}
							
							if(a.dist(0, carPos.z, 0,700)<4 && a.dist(0, carPos.z, 0, 700)>0){
								 flag_done = 1; //together trigger    
							}

						}


 




			a.pop();
			 
			
			
			 
		
     
			if(flag_done == 1){
				//a.setup();
				//a.draw();
			}
			
		};
 








			a.mouseWheel = function(event){
				 
			};

		 
		    
            /*
			a.mousePressed = function(){
					//a.redraw();
					//a.pickRandom();
			};
			
           */
			
		 

	
			 

			

   
			 
 


			a.loadingOk = function(loadModel){ 
			//alert("Model loaded");
			return;
			};

			let angle = 0;

			


		   /*
			a.keyPressed = function(){
				a.pickRandom();
			};
		   */


			a.baseCircle = function(){
				time += a.deltaTime / 800;
				let k = a.map(Math.cos(a.map(time % period, 0, period, 0, a.TWO_PI)), -1, 1, 0.7, 1);
				
				diameter = k * 120;
				spacing = k * 40;
				weight = Math.sin(k *a. PI) * 2;

				    a.push();
					a.noFill();
					a.strokeWeight(weight);
					a.stroke(225, 207, 82);
					a.ellipse(0, 0, diameter + spacing * 2, diameter + spacing * 2);
					a.stroke(216, 180, 84);
					a.ellipse(0, 0, diameter + spacing, diameter + spacing);
					a.stroke(203,126, 84);
					a.ellipse(0, 0, diameter, diameter);
					a.pop();
			};



     
		 


			var number_x,number_y;


		 

				//function creates box objects and pushes them to the array
				a.createRandomBoxes = function(numberOfShapes){
					for (i = 0; i < numberOfShapes; i++) {

							if(a.random(0,1) < .5) {

								number_x = a.random(-2200, -50);
							}

					else {number_x = a.random(50, 2200);
					}
				
					if(a.random(0,1) > .5) {

								number_y = a.random(-2200, -200);
							}

					else {number_y = a.random(200, 2200);
					}
					

							const boxSpecs = {

								pos: a.createVector(0,0,0),
								target: a.createVector(number_x, 0, number_y),
								box: {
									width: a.random(100,130),
									depth: a.random(150,300),
									height: a.random(60,90)
								},
							}
							shapes.push(boxSpecs)
						}
				};
				
				//function for drawing boxes from objects
				a.drawBox = function(shape){
						a.push()
					
						a.translate(shape.pos.x, -shape.box.depth/2, shape.pos.z)
						a.box(shape.box.width, shape.box.depth, shape.box.height)
						a.pop()
				};

				//function to update box movement
				a.updateBox = function(shape){
						shape.pos.lerp(shape.target, 0.01)
				};

				//function to pull objects to origin
				a.sendShapeToOrigin = function(shape){
						shape.target = a.createVector(0, 0, 0)
				};

				//function to redirect objects
				a.setShapeNewTarget = function(shape){
						shape.target = a.createVector(a.random(-1000, 1000), a.random(-1000, 1000),a. random(-1000, 1000))
				};

				//function to send objects to form a sphere
				a.setShapeTargetToSphere = function(shape){
						shape.target = p5.Vector.random3D().mult(500)
				};





			//key controls
			function keyTyped() {
				if (key === "z") {
					createRandomBoxes(random(5, 50));
				} else if (key === "x") {
					shapes = []
					far = 500
					createRandomBoxes(random(50, 100))
				} else if (key === "c") {
					far -= 100
					myCamera.setPosition(50, -100, far);	
				} else if (key === "v") {		
					far += 100
					myCamera.setPosition(50, -100, far);	
				} else if (key === "b") {
					shapes.forEach((x) => sendShapeToOrigin(x))
				} else if (key === "n") {
					shapes.forEach((x) => setShapeNewTarget(x))
				} else if (key === "m") {
					shapes.forEach((x) => setShapeTargetToSphere(x))
				} 
			};

			function setupInstructions() {
				let instructions = a.createDiv(`Instructions: <br>
					z = Add more objects <br>
					x = Reset Sketch <br>
					c = Send all objects to origin <br>
					v = explodes objects outwards again <br>
					b = Zoom in <br>
					n = Zoom out <br>
					m = makes the objects form a sphere <br>
					`);
				instructions.position(100, 100)
				instructions.style("color", "#dddddd","size","3");
			};



			let box_pox1 = 0;
			let box_poy1 = 0;
			let box_poz1 = 0;

			let box_pox2 = 0;
			let box_poy2 = 0;
			let box_poz2 = 0;
            
			let r = 0;
			a.pickRandom = function() {
				rand = a.floor(a.random(crayola.colors.length));//mostly nearest int 
				r = rand;
				for (let c of crayons) {
					if (c.id == rand) {
					 
						box_pox1 = c.pox;
						box_poy1 = c.poy;
						box_poz1 = c.poz;
			
				        box_pox2 = box_pox1;
						box_poy2 = box_poy1;
						box_poz2 = box_poz1;
						devPlaceLocation.set(box_pox2,box_poy2,box_poz2);

					} else {
						c.tpos.x = -3.5 * csize;
						
					}
				}
				 
				sel.selected(crayons[rand].n);//color name being selected in button
		
			};


		   //all abt button stuffs
			function makeSelect() {
				sel = a.createSelect();
				for (let c of crayola.colors) {
					sel.option(c.color);
				}
				sel.position(400, 400); //button position
				sel.changed(pickCrayon);  //when select , change
			};
			
			

			function pickCrayon() {
				 
					flag_start = 1;
			 
					for (let c of crayons) {
						if (c.n == sel.value()) {
						    r = c.id;
						
							box_pox1 = c.pox;
							box_poy1 = c.poy;
							box_poz1 = c.poz;
				
							box_pox2 = box_pox1;
							box_poy2 = box_poy1;
							box_poz2 = box_poz1;
							devPlaceLocation.set(box_pox2,box_poy2,box_poz2);						

						} else {
							c.tpos.x = -3.5 * csize;
						}
					}

					
				//}
			};
			  
		   

			class Crayon {
				constructor(pos, tpos, c, n, w, h, i, pox, poy, poz) {
					this.pos = pos;
					this.tpos = tpos;
					this.c = c;
					this.n = n;
					this.w = w;
					this.h = h;
					this.z = 0;
					//this.ta = random(PI / 2, 3 * PI / 2);
					this.ta = 0;
					this.id = i;
					this.pox = pox;
					this.poy = poy;
					this.poz = poz;
				}
				move() {
					 
					if(flag_moveTogether == 1)
						this.pos.lerp(this.tpos, 0.018);
				    else 
						this.pos.lerp(this.tpos, 0.1);
					//this.z = a.lerp(this.z, this.ta, 0.1);
				}
			
				show() {
					a.push();
						a.translate(this.pos.x, this.pos.y, this.pos.z);
						a.noStroke();
						a.specularMaterial(this.c);
						a.shininess(13);
				 
						a.rotateY(this.z);
						if (a.brightness(a.color(this.c)) > 0) a.tint(this.c);
						else a.tint(50);
						
						a.texture(wrapper);
						a.box(this.w*4, this.w*3, this.h*.4);
					 
					a.pop();
				}
			}

			















		




}

var test = new p5(sketch,'sketch-div1');













