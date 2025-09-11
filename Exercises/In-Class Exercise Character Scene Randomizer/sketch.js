let monkey;
let food1;
let food2;
let food3;
let hat1;
let hat2;
let hat3;
let scene1;
let scene2;
let scene3;
let imagescale = 0.2;

x = 500;
y = 600;

let food_id = 0;
let hat_id = 0;
let scene_id = 0;

function preload() {
  monkey = loadImage("monkey.jpeg");
  food1 = loadImage("food1.jpeg");
  food2 = loadImage("food2.jpeg");
  food3 = loadImage("food3.jpeg");
  hat1 = loadImage("hat1.jpeg");
  hat2 = loadImage("hat2.jpeg");
  hat3 = loadImage("hat3.jpeg");
  scene1 = loadImage("scene1.jpeg");
  scene2 = loadImage("scene2.jpeg");
  scene3 = loadImage("scene3.jpeg");
}

function setup() {
  createCanvas(x, y);
}

function draw() {

background(100,100,255);  

if (scene_id == 1) {
  image(scene1, 0, 0, width, height);
} else if (scene_id === 2) {
  image(scene2, 0, 0, width, height);
} else if (scene_id === 3) {
  image(scene3, 0, 0, width, height);
}

image(monkey, 50, 200, 420, 400);

if (food_id == 1) {
  image(food1, 150, 400, 200, 200); 
} else if (food_id == 2) {
  image(food2, 150, 400, 200, 200);
} else if (food_id == 3) {
  image(food3, 150, 400, 200, 200);
}

if (hat_id == 1) {
  image(hat1, 160, 100, 200, 200);
} else if (hat_id == 2) {
  image(hat2, 160, 90, 200, 200);
} else if (hat_id == 3) {
  image(hat3, 150, 130, 200, 200);
}


}

function shuffleFood() {
  food_id = int(random(1, 4));
}
function shuffleHat() {
  hat_id = int(random(1, 4));
}
function shuffleScene() {
  scene_id = int(random(1, 4));
}

function keyPressed() {
if (keyCode === LEFT_ARROW) {
  shuffleFood();
}
if (keyCode === UP_ARROW) {
  shuffleHat();
}
if (keyCode === RIGHT_ARROW) {
  shuffleScene();
}
if (keyIsDown(DOWN_ARROW)) {
shuffleFood();
shuffleHat();
shuffleScene();
}
}

