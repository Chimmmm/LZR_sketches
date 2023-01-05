

let agv;
let popUp = false;
let path = [];

let lastTime = 0;

let agv_refresh_s = [0, 1];
let agv_refresh_state;
let agv_refresh_x;
let agv_refresh_y;


let w = 1920;
let h = 1080;
let map;


let AGV_INFO, SHELF_EMPTY, MISSION_PATHS, SHELF_LIST, AGV_MOVE, GROUND_CAGE;
let shelf_empty_url = 'http://127.0.0.1:8887/json/shelf-room-confirm.json';
let agv_info_url = 'http://127.0.0.1:8887/json/agv-info.json';
let shelf_list_url = 'http://127.0.0.1:8887/json/shelf-list.json';
let agv_move_url = 'http://127.0.0.1:8887/json/agv-move.json';
let mission_paths_url = 'http://127.0.0.1:8887/json/mission-paths.json';
let ground_cage_url = 'http://127.0.0.1:8887/json/ground-cage-confirm.json';


let floor = 1;


//local server must set CORS headers

function Get_GROUND_CAGE_Json() {

	let url = ground_cage_url;
	httpGet(url, 'json', false, function (response) {
		GROUND_CAGE = response;
	},
		function (error) {
			console.log(error);
		});

}

function Get_AGV_INFO_Json() {

	let url = agv_info_url;
	httpGet(url, 'json', false, function (response) {
		AGV_INFO = response;
	},
		function (error) {
			console.log(error);
		});

}

/*
function Get_SHELF_EMPTY_OR_NOT_Json() {

	let url = shelf_empty_url;
	httpGet(url, 'json', false, function (response) {
		SHELF_EMPTY = response;
	},
		function (error) {
			console.log(error);
		});

}
*/

function Get_SHELF_LIST_Json() {

	let url = shelf_list_url;

	httpGet(url, 'json', false, function (response) {
		SHELF_LIST = response;
	},
		function (error) {
			console.log(error);
		});

}

function Get_AGV_MOVE_Json() {

	let url = agv_move_url;
	httpGet(url, 'json', false, function (response) {
		AGV_MOVE = response;
	},
		function (error) {
			console.log(error);
		});

}

function Get_MISSION_PATHS_Json() {

	let url = mission_paths_url;
	httpGet(url, 'json', false, function (response) {
		MISSION_PATHS = response;
	},
		function (error) {
			console.log(error);
		});

}

function Get_Point_Cage_Json() {

	let url = mission_paths_url;
	httpGet(url, 'json', false, function (response) {
		MISSION_PATHS = response;
	},
		function (error) {
			console.log(error);
		});

}



let emptyShelf = [];

function checkEmptyShelf() {
	emptyShelf = [];
	for (let s = 0; s < 130; s++) {
		if (SHELF_LIST.SHELF_LIST[s].Room_1.cage_num == "0" && SHELF_LIST.SHELF_LIST[s].Room_2.cage_num == "0" && SHELF_LIST.SHELF_LIST[s].Room_3.cage_num == "0") {
			emptyShelf.push(shelf[s]);
		}
	}

}

function drawEmptyShelf() {
	//draw empty shelf
	for (let e of emptyShelf) {
		image(empty, e[0] - m_w * .0106, e[1] - m_h * .014);
	}
}




function preload() {

	map = loadImage('img/cad1.png');
	empty = loadImage('img/empty.png');

	Get_SHELF_LIST_Json();

	Get_AGV_INFO_Json();
	Get_AGV_MOVE_Json();
	Get_MISSION_PATHS_Json();
	Get_GROUND_CAGE_Json();



}







////////////delete////////////////

function refreshAgvState() {  //simulate AGV state myself 

	agv_refresh_state = random(agv_refresh_s);
}

function refreshAgvMove() {

	//let agv move on 1st floor
	agv_refresh_x = int(random(20, m_w * .52));
	agv_refresh_y = int(random(m_h * .6, m_h));
	agvPHI = random(0, PI);

}

//////////delete////////////////







let shelf, shelf_name;

function setup() {

	createCanvas(w, h);
	rectMode(CENTER);


	setInterval(refreshAgvMove, 2000);  //delete
	setInterval(refreshAgvState, 10000);  //delete
	setInterval(checkEmptyShelf, 2000);


	setInterval(Get_AGV_MOVE_Json, 2000);
	setInterval(Get_MISSION_PATHS_Json, 10000);

	agv = new Agv(150, 1000, 200, 1200); //init agv at 200 1200 position on  1st floor 

	agv_refresh_x = 150;
	agv_refresh_y = 1000;
	m_w = map.width;
	m_h = map.height;




	// shelves click event

	shelf = [
		[m_w * .0251, m_h * .318], [m_w * .0251, m_h * .35], [m_w * .0251, m_h * .385], [m_w * .0251, m_h * .418], [m_w * .0251, m_h * .454], [m_w * .0251, m_h * .486],
		[m_w * .1025, m_h * .318], [m_w * .1025, m_h * .35], [m_w * .1025, m_h * .385], [m_w * .1025, m_h * .418], [m_w * .1025, m_h * .454], [m_w * .1025, m_h * .486],
		[m_w * .133, m_h * .318], [m_w * .133, m_h * .35], [m_w * .133, m_h * .385], [m_w * .133, m_h * .418], [m_w * .133, m_h * .454], [m_w * .133, m_h * .486],
		[m_w * .211, m_h * .318], [m_w * .211, m_h * .35], [m_w * .211, m_h * .385], [m_w * .211, m_h * .418], [m_w * .211, m_h * .454], [m_w * .133, m_h * .486],
		[m_w * .241, m_h * .318], [m_w * .241, m_h * .35], [m_w * .241, m_h * .385], [m_w * .241, m_h * .418], [m_w * .241, m_h * .454], [m_w * .241, m_h * .486],
		[m_w * .319, m_h * .318], [m_w * .319, m_h * .35], [m_w * .319, m_h * .385], [m_w * .319, m_h * .418], [m_w * .319, m_h * .454], [m_w * .319, m_h * .486],
		[m_w * .536, m_h * .318], [m_w * .536, m_h * .35], [m_w * .536, m_h * .385], [m_w * .536, m_h * .418], [m_w * .536, m_h * .454], [m_w * .536, m_h * .486],
		[m_w * .566, m_h * .318], [m_w * .566, m_h * .35], [m_w * .566, m_h * .385], [m_w * .566, m_h * .418], [m_w * .566, m_h * .454], [m_w * .566, m_h * .486],
		[m_w * .645, m_h * .318], [m_w * .645, m_h * .35], [m_w * .645, m_h * .385], [m_w * .645, m_h * .418], [m_w * .645, m_h * .454], [m_w * .645, m_h * .486],
		[m_w * .674, m_h * .318], [m_w * .674, m_h * .35], [m_w * .674, m_h * .385], [m_w * .674, m_h * .418], [m_w * .674, m_h * .454], [m_w * .674, m_h * .486],
		[m_w * .753, m_h * .318], [m_w * .753, m_h * .35], [m_w * .753, m_h * .385], [m_w * .753, m_h * .418], [m_w * .753, m_h * .454], [m_w * .753, m_h * .486],
		[m_w * .782, m_h * .318], [m_w * .782, m_h * .35], [m_w * .782, m_h * .385], [m_w * .782, m_h * .418], [m_w * .782, m_h * .454], [m_w * .861, m_h * .486],
		[m_w * .861, m_h * .318], [m_w * .861, m_h * .35], [m_w * .861, m_h * .385], [m_w * .861, m_h * .418], [m_w * .861, m_h * .454], [m_w * .861, m_h * .486],
		[m_w * .89, m_h * .318], [m_w * .89, m_h * .35], [m_w * .89, m_h * .385], [m_w * .89, m_h * .418], [m_w * .89, m_h * .454], [m_w * .89, m_h * .486],
		[m_w * .969, m_h * .318], [m_w * .969, m_h * .35], [m_w * .969, m_h * .385], [m_w * .969, m_h * .418], [m_w * .969, m_h * .454], [m_w * .969, m_h * .486],
		[m_w * .97, m_h * .038], [m_w * .97, m_h * .076], [m_w * .97, m_h * .108], [m_w * .97, m_h * .145], [m_w * .97, m_h * .177],
		[m_w * .891, m_h * .038], [m_w * .891, m_h * .076], [m_w * .891, m_h * .108], [m_w * .891, m_h * .145], [m_w * .891, m_h * .177],
		[m_w * .862, m_h * .038], [m_w * .862, m_h * .076], [m_w * .862, m_h * .108], [m_w * .862, m_h * .145], [m_w * .862, m_h * .177],
		[m_w * .782, m_h * .038], [m_w * .782, m_h * .076], [m_w * .782, m_h * .108], [m_w * .782, m_h * .145], [m_w * .782, m_h * .177],
		[m_w * .754, m_h * .038], [m_w * .754, m_h * .076], [m_w * .754, m_h * .108], [m_w * .754, m_h * .145], [m_w * .754, m_h * .177],
		[m_w * .675, m_h * .038], [m_w * .675, m_h * .076], [m_w * .675, m_h * .108], [m_w * .675, m_h * .145], [m_w * .675, m_h * .177],
		[m_w * .645, m_h * .038], [m_w * .645, m_h * .076], [m_w * .645, m_h * .108], [m_w * .645, m_h * .145], [m_w * .645, m_h * .177],
		[m_w * .566, m_h * .038], [m_w * .566, m_h * .076], [m_w * .566, m_h * .108], [m_w * .566, m_h * .145], [m_w * .566, m_h * .177]
	];

	shelf_name = [
		"1338_A01", "1338_A02", "1338_B01", "1338_B02", "1338_C01", "1338_C02",
		"1337_A01", "1337_A02", "1337_B01", "1337_B02", "1337_C01", "1337_C02",
		"1336_A01", "1336_A02", "1336_B01", "1336_B02", "1336_C01", "1336_C02",
		"1335_A01", "1335_A02", "1335_B01", "1335_B02", "1335_C01", "1335_C02",
		"1334_A01", "1334_A02", "1334_B01", "1334_B02", "1334_C01", "1334_C02",
		"1333_A01", "1333_A02", "1333_B01", "1333_B02", "1333_C01", "1333_C02",
		"1332_A01", "1332_A02", "1332_B01", "1332_B02", "1332_C01", "1332_C02",
		"1331_A01", "1331_A02", "1331_B01", "1331_B02", "1331_C01", "1331_C02",
		"1330_A01", "1330_A02", "1330_B01", "1330_B02", "1330_C01", "1330_C02",
		"1329_A01", "1329_A02", "1329_B01", "1329_B02", "1329_C01", "1329_C02",
		"1328_A01", "1328_A02", "1328_B01", "1328_B02", "1328_C01", "1328_C02",
		"1327_A01", "1327_A02", "1327_B01", "1327_B02", "1327_C01", "1327_C02",
		"1326_A01", "1326_A02", "1326_B01", "1326_B02", "1326_C01", "1326_C02",
		"1325_A01", "1325_A02", "1325_B01", "1325_B02", "1325_C01", "1325_C02",
		"1324_A01", "1324_A02", "1324_B01", "1324_B02", "1324_C01", "1324_C02",
		"1323_C01", "1323_B02", "1323_B01", "1323_A02", "1323_A01",
		"1322_C01", "1322_B02", "1322_B01", "1322_A02", "1322_A01",
		"1321_C01", "1321_B02", "1321_B01", "1321_A02", "1321_A01",
		"1320_C01", "1320_B02", "1320_B01", "1320_A02", "1320_A01",
		"1319_C01", "1319_B02", "1319_B01", "1319_A02", "1319_A01",
		"1318_C01", "1318_B02", "1318_B01", "1318_A02", "1318_A01",
		"1317_C01", "1317_B02", "1317_B01", "1317_A02", "1317_A01",
		"1316_C01", "1316_B02", "1316_B01", "1316_A02", "1316_A01"
	];

}




let AGVstate = 0, old_AGVstate = 0;
let s = .68; //scale of canvas
let offset = 140;
let m_w;
let m_h;
let agv_got_cage = 0, agv_got_cage_old = 0;

function draw() {

	background(115, 225, 220);
	scale(s);

	if (!SHELF_LIST)
		return;


	//fps display
	fill(25, 120, 220);
	let t = millis();
	textSize(67);
	text(int(1000 / (t - lastTime)), 70, 100);
	lastTime = t;



	translate(offset / s, 0, 0);

	image(map, 0, 0);
	drawEmptyShelf();

	AGVstate = agv_refresh_state;  //AGVstate = AGV_MOVE.state;


	//new steps come, push them to the list
	if ((AGVstate != old_AGVstate) && AGVstate == 1) {

		for (let i = 0; i < MISSION_PATHS.MISSION_PATHS.length - 1; i++) {

			path.push(new Path(
				MISSION_PATHS.MISSION_PATHS[i].x,
				MISSION_PATHS.MISSION_PATHS[i].y,
				MISSION_PATHS.MISSION_PATHS[i + 1].x,
				MISSION_PATHS.MISSION_PATHS[i + 1].y));

		}


	}


	if (old_AGVstate != AGVstate) {   //if state be changed
		if (agv.reach) {
			old_AGVstate = AGVstate;
		}
	}



	if (AGVstate) {
		if (agv.reach) {

			//if agv gets into the elvator at 1 floor , then init it to the 2 floor

			if ((dist(agv.location.x, m_w * .4) < 150 && dist(agv.location.y, m_h * .93) < 180)
				|| (dist(agv.location.x, m_w * .4) < 150 && dist(agv.loction.y, m_h * .46) < 180)) {
				console.log("ON ELVATOR!");
				rect(m_w * .4, m_h * .93, 100, 100);
				rect(m_w * .4, m_h * .46, 100, 100);
				agv = new Agv(agv.step.x, agv.step.y, agv.step.x, agv.step.y);
			}

			refreshAgvMove();
			agv.step.x = agv_refresh_x;
			agv.step.y = agv_refresh_y;

		}
		else {
			for (let p of path)
				p.show();
		}

	}


	agv.update();
	agv.show();
	agv.mouseOver((mouseX - offset) / s, mouseY / s);



	noStroke();


	if (agv.reach) {
		if (dist(AGV_MOVE.agvX, AGV_MOVE.agvY, m_w * .5, m_h * .65 < 55) || dist(AGV_MOVE.agvX, AGV_MOVE.agvY, m_w * .518, m_h * .17 < 55)) {
			Get_GROUND_CAGE_Json();
		}
		if (AGV_MOVE.agvX > m_w * .01 && AGV_MOVE.agvX < m_w * .96 && AGV_MOVE.agvY > m_h * .01 && AGV_MOVE.agvY < m_h * .5) {
			Get_SHELF_LIST_Json();
		}
	}


	fill(40, 100, 200);
	if (GROUND_CAGE.floor1)
		rect(m_w * .487, m_h * .63, 50, 50);
	if (GROUND_CAGE.floor3)
		rect(m_w * .512, m_h * .145, 50, 50);



	textSize(22);
	if (popUp) {

		if (shelf_num < 36) {

			fill(200, 200, 255, a);
			rect(shelf[shelf_num][0], shelf[shelf_num][1], 52, 52);
			//shelf_JSON.num = "1338_A01";//send request to server
			fill(0, 250, 160);
			translate(m_w * .11, 0, 0);
			rect(shelf[shelf_num][0], shelf[shelf_num][1], 400, 300);


			fill(200);
			translate(0, -m_h * .035, 0);
			rect(shelf[shelf_num][0], shelf[shelf_num][1], 380, 70);

			//
			fill(200);
			translate(0, m_h * .05, 0);
			rect(shelf[shelf_num][0], shelf[shelf_num][1], 380, 70);

			fill(200);
			translate(0, m_h * .05, 0);
			rect(shelf[shelf_num][0], shelf[shelf_num][1], 380, 70);

			fill(255);
			translate(-m_w * .076, -m_h * .134, 0);
			text('货架号：' + shelf_name[shelf_num], shelf[shelf_num][0], shelf[shelf_num][1]);

			fill(0);
			translate(0, m_h * .03, 0);
			text('笼子号：' + SHELF_LIST.SHELF_LIST[shelf_num].Room_1.cage_num, shelf[shelf_num][0], shelf[shelf_num][1]);

			translate(0, m_h * .05, 0);
			text('笼子号：' + SHELF_LIST.SHELF_LIST[shelf_num].Room_2.cage_num, shelf[shelf_num][0], shelf[shelf_num][1]);

			translate(0, m_h * .05, 0);
			text('笼子号：' + SHELF_LIST.SHELF_LIST[shelf_num].Room_3.cage_num, shelf[shelf_num][0], shelf[shelf_num][1]);
		}
		else {

			fill(200, 200, 255, a);
			rect(shelf[shelf_num][0], shelf[shelf_num][1], 52, 52);
			//shelf_JSON.num = "1338_A01";//send request to server
			fill(0, 250, 160);
			translate(-m_w * .11, m_h * .07, 0);
			rect(shelf[shelf_num][0], shelf[shelf_num][1], 400, 300);

			fill(200);
			translate(0, -m_h * .035, 0);
			rect(shelf[shelf_num][0], shelf[shelf_num][1], 380, 70);
			text(SHELF_LIST.SHELF_LIST[shelf_num].Room_1);

			fill(200);
			translate(0, m_h * .05, 0);
			rect(shelf[shelf_num][0], shelf[shelf_num][1], 380, 70);

			fill(200);
			translate(0, m_h * .05, 0);
			rect(shelf[shelf_num][0], shelf[shelf_num][1], 380, 70);

			fill(255);
			translate(-m_w * .076, -m_h * .134, 0);
			text('货架号：' + shelf_name[shelf_num], shelf[shelf_num][0], shelf[shelf_num][1]);

			fill(0);
			translate(0, m_h * .03, 0);
			text('笼子号：' + SHELF_LIST.SHELF_LIST[shelf_num].Room_1.cage_num, shelf[shelf_num][0], shelf[shelf_num][1]);

			translate(0, m_h * .05, 0);
			text('笼子号：' + SHELF_LIST.SHELF_LIST[shelf_num].Room_2.cage_num, shelf[shelf_num][0], shelf[shelf_num][1]);

			translate(0, m_h * .05, 0);
			text('笼子号：' + SHELF_LIST.SHELF_LIST[shelf_num].Room_3.cage_num, shelf[shelf_num][0], shelf[shelf_num][1]);
		}
	}

}


let a;
let shelf_num;
function mousePressed() {

	if (popUp) {
		a = 0;
		popUp = false;
	}
	else {
		a = 200;
		for (let i = 0; i < shelf.length; i++) {
			let j = 0;
			if (dist((mouseX - offset) / s, mouseY / s, shelf[i][j], shelf[i][j + 1]) < 25) {
				shelf_num = i;
				popUp = true;
			}
		}
	}

}




