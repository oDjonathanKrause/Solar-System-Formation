const SEED = 0;
const SPAWN_VELOCITY = 0.015;
const CAM_SPEED = 10;
const DUST_VELOCITY = 2.5;

let dusts = [];
let keysDown = [1000];
let camPos, starPos, numNewDusts, spawnPos, mouseDown, starSize, dustSize, gravity;
let dustSizeS, starSizeS, dustSizeP, starSizeP;


function setup() {
	createCanvas(600, 600);
	rectMode(CENTER);
	ellipseMode(CENTER);
	noStroke();
	fill(255);

	SEED == 0 ? randomSeed(random(9999)) : randomSeed(SEED);
	camPos = createVector(0, 0);
	starPos = createVector(width/2, height/2);

	// DOM elements
	dustSizeS = createSlider(3, 30, 1, 1);
	starSizeS = createSlider(5, 50, 3, 1);
	dustSizeP = createP();
	starSizeP = createP();

	dustSizeS.position(width, 40);
	dustSizeP.position(width+10, 0);
	starSizeS.position(width, 100);
	starSizeP.position(width+10, 60);

	// Initial values
	starSize = starSizeS.value();
	dustSize = dustSizeS.value();
	gravity = starSize * 0.01;
}

function draw() {
	background(0);
	ellipse(starPos.x + camPos.x, starPos.y + camPos.y, starSize, starSize);

	// Slider control
	starSizeP.html("Star size: " + starSizeS.value());
	dustSizeP.html("Dust size: " + dustSizeS.value());
	starSize = starSizeS.value();
	dustSize = dustSizeS.value();
	
	// A big star has a stronger gravity
	gravity = starSize * 0.01;

	// Add dusts when keydown
	for (let i = 0; i < numNewDusts; i++)
		dusts.push(new SpaceDust(0, 0));
	numNewDusts = 0;

	// Update dusts
	for (dust of dusts) {
		dust.update();
	}

	// Keyboard control
	if (keysDown[87]) camPos.y += CAM_SPEED;
	if (keysDown[83]) camPos.y -= CAM_SPEED;
	if (keysDown[65]) camPos.x += CAM_SPEED;
	if (keysDown[68]) camPos.x -= CAM_SPEED;
	if (keysDown[78]) numNewDusts += 1;

	// Draw mouse line
	if (mouseDown) {
		stroke(255);
		line(spawnPos.x, spawnPos.y, mouseX, mouseY);
		noStroke();
	}
}


function mousePressed() {
	mouseDown = true;
	spawnPos = createVector(mouseX, mouseY);
}

function mouseReleased() {
	dusts.push(new SpaceDust(
		createVector(spawnPos.x - camPos.x, spawnPos.y - camPos.y),
		createVector((spawnPos.x - mouseX) * SPAWN_VELOCITY, (spawnPos.y - mouseY) * SPAWN_VELOCITY)
	));

	mouseDown = false;
}

function keyPressed() {
	keysDown[keyCode] = true;
}

function keyReleased() {
	keysDown[keyCode] = false;
}
