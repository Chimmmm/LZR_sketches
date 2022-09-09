//p5.disableFriendlyErrors = true;
//3D model object01_horse-low-blender.obj by KONDO Kunio 2022.06
// Tea pot data https://en.wikipedi org/wiki/Utah_teapot
 

			var easycam;
			let myCanvas;
			document.oncontextmenu = ()=>false;


			function preload(){
			
				Top =  loadModel('asset/top.obj', true,  loadingOk());
				Stretch =  loadModel('asset/stretch.obj', true,  loadingOk());
				Lift =  loadModel('asset/lift.obj', true,  loadingOk());
				Car =  loadModel('asset/car.obj', true,  loadingOk());
				Shelf =  loadModel('asset/Shelf.obj', true,  loadingOk());
				Cage =  loadModel('asset/cage.obj', true,  loadingOk());
			
			}
 
		 
			function setup(){
				
			 
				 myCanvas =  createCanvas(1920, 1080, WEBGL).GL;
			     pixelDensity(1);
		 
                Dw.EasyCam.prototype.apply = function(n){
					var o = this.cam;
					n = n||o.renderer, n&&(this.camEYE = this.getPosition(this.camEYE),this.camLAT=this.getCenter(this.camLAT),this.camRUP=this.getUpVector(this.camRUP),n._curCamera.camera(this.camEYE[0],this.camEYE[1],this.camEYE[2],this.camLAT[0],this.camLAT[1],this.camLAT[2],this.camRUP[0],this.camRUP[1],this.camRUP[2]))
				  };

 

                setAttributes('antialias',true);

				easycam = createEasyCam({distance : 900});
				//easycam = new Dw.EasyCam(this._renderer,state1);
				//easycam.setState(state1,1500);
				//perspective(60*PI/180 ,width/innerHeight,1,5000);
			    
               // easycam.pan(20,20);
			   easycam.setRotationScale(.0006);
			   // easycam.setPanScale(10);
			   // easycam.setZoomScale(.001);
			   easycam.setRotationConstraint(1,0,0);
			}

			



			//------- parameters----------
 
			function draw(){
				
	
			easycam.setViewport([0,0, windowWidth, windowHeight]);

			background(245);
			noStroke();


			 ambientLight(100,70,160);
			 pointLight(50, 130, 155, -500, 1000, -500);
			 pointLight(50, 235, 155, 500, -1000, 500);
			 shininess(2);
			 //strokeWeight(3);
			

			 //noStroke();
		 
			 myCanvas.enable(WEBGL.CULL_FACE);
			 myCanvas.cullFace(WEBGL.BACK);


			
		  
			//--------- car moving operating --------
			
			
			 push();
			 translate(0,260,0);
			 rotateX(- PI/2);
			//specularMaterial(255, 255, 255,10);
			// circle(0,0,3000);
			//sphere(1500);
			 pop();

			 specularMaterial(255, 255, 255,230);
		
			 push();
				scale(.8);
				translate(250,144,20);
				rotateZ( PI/2);		
			 pop();


			 push();
			 rotateZ( PI);
		
			 push();
			 scale(2);
			 translate(0,0,0);
			 rotateY( PI);
				 
					
						 push();
						 translate(-30,0,0);
						 rotateX( PI/2);		 
						 pop();
						 model(Car); 
	
						 push();
						 scale(.5);
						 translate(-160,-170,0);

						 model(Lift);
						 pop();

							 push();
							 scale(.5);
							 translate(-56,20,0);
							 model(Stretch);
							 pop();

							 push();
							 scale(.5);
							 translate(-56,120,0);
							 model(Top);
							 pop();

							 pop();
			
					 pop();
			

					 //setupInstructions();
			
			}




            function loadingOk(){ 
			   //alert("Model loaded");
			   return;
			}

			let angle = 0;


			function setupInstructions() {
				let instructions =  createDiv(`Instructions: <br>
					z = Add more objects <br>
					x = Reset Sketch <br>
					c = Send all objects to origin <br>
					v = explodes objects outwards again <br>
					b = Zoom in <br>
					n = Zoom out <br>
					m = makes the objects form a sphere <br>
					`);
				instructions.position(100, 200)
				instructions.style("color", "#bbbbbb","size","1");
			}


	


		












