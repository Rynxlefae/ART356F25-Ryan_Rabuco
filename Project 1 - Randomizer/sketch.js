var pikminParty;
let imagescale = 0.20;
let n = 5;
let type = 9;

function preload() {
  pikminParty = [];
  var pikType = 9; 
  for (var i = 0; i < pikType; i++) {
    pikminParty[i] = loadImage((i + 1) + ".jpeg");
  }
}

function setup() {
  createCanvas(1000, 700);
  textAlign(CENTER);
  textSize(16);
  fill(255);
  background(125, 100, 125);
}

function draw(){
  for (var i = 0; i < n; i++) {
  var r = int(random(0, type)); 
  var x = int(random(-150, 1000));
  var y = int(random(-150, 700));
  var randomPikmin = pikminParty[r] 
    
  pikWidth = randomPikmin.width * imagescale;
  pikHeight = randomPikmin.height * imagescale;

  if (keyIsPressed)
    if (keyCode == ENTER) {
    x += random(-50, 50);
    y += random(-50, 50);
  }
  if (mouseIsPressed === true){
    image(randomPikmin, x, y, pikWidth, pikHeight);
    } 
  fill(0);       
  rect(40, 5, 535, 30); 
  fill(255, 100, 255);        
  text("Pikmin Bloom Rate: " + n, 125, 25);
  text("Pikmin Types: " + type + "/9", 300, 25);
  text("Pikmin Size: " + imagescale.toFixed(2) + "cm", 500, 25); //Had to search up how to round its display because of a weird floating decimal thing for 'toFixed'
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (type > 1) {
      type = type - 1;
    }
  }
  if (keyCode === RIGHT_ARROW) {
    if (type < 9) {
      type = type + 1;
    }
  }
  if (keyCode === UP_ARROW) {
    n = n + 1; 
  }
  if (keyCode === DOWN_ARROW) {
    if (n > 1) {
      n = n - 1;
    }
  }
  if (key === 'Z' || key === 'z') {
    if (imagescale > 0.05) {
      imagescale = imagescale - 0.05;
    }
  }
  if (key === 'X' || key === 'x') {
    if (imagescale < 1) {
      imagescale = imagescale + 0.05;
    }
  }
    if (imagescale < 0.049) {
      imagescale = imagescale + 0.05;
    }
   if (keyCode == ENTER) {
    background(125, 100, 125);
    }
}

