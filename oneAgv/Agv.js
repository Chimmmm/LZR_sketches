class Agv {

	constructor(x, y, stepX, stepY) {
		this.location = createVector(x, y);
		this.aim_pos = createVector();
		this.velocity = this.aim_pos.sub(this.location);
		this.acceleration = createVector();
		this.c = 0;
		this.t0 = millis();
		this.tc = 0;
		this.cageloc = createVector(0, 0);
		this.stop_angle;
		this.stepX = stepX;
		this.stepY = stepY;
		this.step = createVector(this.stepX, this.stepY);
		this.reach = 0;
		this.over = false;


		this.currentPath = [];
		this.paths = [this.currentPath];

	}

	update() {

		this.aim_pos = createVector(this.step.x, this.step.y);
		let seekForce = this.seek(this.aim_pos);
		seekForce.mult(1);


		this.acceleration.add(seekForce);
		this.velocity.add(this.acceleration);
		this.velocity.limit(1);
		this.location.add(this.velocity);
		this.acceleration.set(0, 0);


		this.currentPath.push(this.location.copy());
		if (!AGVstate) {
			this.paths = [];
			this.currentPath = [];
			this.paths = [this.currentPath];
		}
	}

	show() {


		stroke(255, 60);
		strokeWeight(20);
		line(this.location.x, this.location.y, this.aim_pos.x, this.aim_pos.y);
		strokeWeight(this.c * 0.125);
		stroke(this.c, 50, 100);

		for (let path of this.paths) {
			beginShape();
			stroke(0, 250, 160);
			strokeWeight(16);
			noFill();
			for (let p of path) {
				vertex(p.x, p.y);
			}
			endShape();
		}




		push();

		translate(this.location.x, this.location.y);
		let stop = this.location.dist(this.aim_pos);
		let theta = this.velocity.heading() + radians(90);
		if (stop > 6) { //has not reach the point 
			this.stop_angle = theta;
			agv.reach = 0;
		}
		else {
			this.reach = 1;
		}

		if (this.over) {
			Get_AGV_INFO_Json();
			fill(255, 255, 0);
			stroke(0);
			strokeWeight(2);
			rect(0, -160, 200, 120);
			fill(0);
			noStroke();
			textSize(22);
			text("任务：" + AGV_INFO.mission_num, -80, -180);
			text("笼号：" + AGV_INFO.cage_num, -80, -150);
			text("状态：" + AGV_INFO.AGVSTATE, -80, -120);

		}

		rotate(this.stop_angle);

		noStroke();
		fill(200, 0, 0);
		rect(0, 0, 40, 50, 10);

		fill(10);
		rect(0, 0, 34, 40, 10);
		rect(-20, 20, 14, 14, 3);
		rect(20, 20, 14, 14, 3);
		rect(-10, -50, 10, 60, 10);
		rect(10, -50, 10, 60, 10);
		rect(0, -22, 50, 4, 10);

		fill(40, 80, 30);
		rect(0, -14, 40, 10);
		rect(0, 14, 40, 10);

		fill(200, 0, 0);
		rect(0, 14, 4, 4);


		//got cage?
		if (AGV_INFO.got_cage) {
			fill(40, 80, 255);
			rect(0, -52, 48, 40);
		}

		if (this.over) {
			fill(200, 0, 0, 255);
			rect(0, 0, 40, 50, 10);
			rect(0, 0, 34, 40, 10);
			rect(-20, 20, 14, 14, 3);
			rect(20, 20, 14, 14, 3);
			rect(-10, -50, 10, 60, 10);
			rect(10, -50, 10, 60, 10);
			rect(0, -22, 50, 4, 10);
			if (AGV_INFO.got_cage)
				rect(0, -52, 48, 40);


		}

		pop();




	}

	seek(theTarget) {
		let desired = p5.Vector.sub(theTarget, this.location);

		desired.normalize();
		desired.mult(3);
		let steer = p5.Vector.sub(desired, this.velocity);
		steer.limit(.2);
		return steer;
	}

	mouseOver(px, py) {
		let d = dist(px, py, this.location.x, this.location.y);
		this.over = d < 100;
	}


}










