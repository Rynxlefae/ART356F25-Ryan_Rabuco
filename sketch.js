let data;
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9TsQ16aGcSbSfFsVT2EPrwNvxvQ7_2h4FORHNwo2y3J_vCwYBBjIrcOfyiwbnkJ-_1W5hDaAESSpm/pub?output=csv";
let row = 0;
function preload(){
  data = loadTable(url, 'csv', 'header');
}

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(0);
//Food Array
let food;
if (row === 0) {
  food = "Kirkland Granola Bars (1/5)"; 
} else if (row === 1) {
  food = "Hello Panda Chocolate (2/5)"; 
} else if (row === 2) {
  food = "Kirkland Popcorn (3/5)";  
} else if (row === 3) {
  food = "Golden Island KBBQ Pork Jerkey (4/5)"; 
} else if (row === 4) {
  food = "Welch's Fruit Snacks (5/5)"; 
}
  textSize(20);
  fill(255);
  text("Left Arrow/RightArrow: Cycle Through Foods", 10, 25);
  text("Stats of " + food, 10, 100);
//Row Data
  if (data) {
    let x = 200;
    let y = 200;
    row = constrain(row, 0, 4);
  
    let calories = data.getNum(row, "Calories");
    let sugar = data.getNum(row, "Sugar");
    let carbs = data.getNum(row, "Carbs");
    let sodium = data.getNum(row, "Sodium");
    let protein = data.getNum(row, "Protein");
//Ellipse Sizes
  let w1 = calories; 
  let h1 = calories; 
  let w2 = sugar * 3; 
  let h2 = sugar * 3; 
  let w3 = carbs * 3;
  let h3 = carbs * 3; 
  let w4 = sodium * 100; 
  let h4 = sodium * 100; 
  let w5 = protein * 10; 
  let h5 = protein * 10; 
//Ellipse Colors
  let red = color(255, 0, 0); 
  let pink = color(255, 0, 255); 
  let green = color(100, 255, 100); 
  let white = color(255, 255, 255); 
  let blue = color(100, 100, 255); 
//Ellipses
  fill(red);
  ellipse(x, y, w1, h1); 
  fill(pink);
  ellipse(x + 120, y, w2, h2); 
  fill(green);
  ellipse(x + 240, y, w3, h3); 
  fill(white);
  ellipse(x + 360, y, w4, h4);
  fill(blue);
  ellipse(x + 480, y, w5, h5);
//Ellipse Labels
  textSize(12);
  fill(255);
  text("Calories: " + calories, x - 30, y - h1 / 2 - 10);
  text("Sugar: " + sugar + "g", x + 100, y - h2 / 2 - 10);
  text("Carbs: " + carbs + "g", x + 220, y - h3 / 2 - 10);
  text("Sodium: " + sodium + "mL", x + 320, y - h4 / 2 - 10);
  text("Protein: " + protein + "g", x + 460, y - h5 / 2 - 10);
  }
}
//Key Interactions
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
  row++;
  } else if (keyCode === LEFT_ARROW) {
  row--;}

  if (row > 4) {
  row = 0;
  } else if (row < 0) {
  row = 4;}
}
