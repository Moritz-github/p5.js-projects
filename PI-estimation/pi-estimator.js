function setup() {
  createCanvas(400, 420);
}

function random(max){
	return Math.floor(Math.random()*max + 1);
}

var amountCircle = 0;
var total = 0;

var closest = 99.99;

function draw() {
  fill(color(255,255,255));
	background(0);
  ellipse(200, 200, 400, 400);
	
	var x = random(400);
	var y = random(400);
	
	total += 1;
	
	// if the pixel is white
	if (get(x,y)[0] == 255){
		amountCircle += 1;
	}

	var pi = 4 * (amountCircle / total);
	if (Math.abs(Math.PI - closest) > Math.abs(Math.PI - pi)){
		closest = pi;
	}
	
	fill(color(200,200,200));
	rect(-1,400,401,50);
	
	fill(color(255,255,255));
	text("Pi estimate: "+pi, 3, 416);
	text("Closest to Pi: "+closest, 230, 416);
	
	fill(color(10,200,10));
	ellipse(x, y, 10, 10);
}