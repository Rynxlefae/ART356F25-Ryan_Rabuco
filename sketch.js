let currentCounty = 0;
let hoveredNewCases = null;
let hoveredDate = null; 

function setup() {
  createCanvas(800, 600);
  latoFont = loadFont('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
  loadJSON('https://data.cdc.gov/resource/yviw-z6j5.json', gotData);
}
//Push Data
function gotData(data) {
counties = Array.from(new Set(data.map(alabama => alabama.county)));
alabamaCounties = counties.map(county => {
  let countyData = data.filter(alabama => alabama.county === county);
  let newCases = countyData.map(alabama => int(alabama.new_cases));
  let cumulativeCases = countyData.map(alabama => int(alabama.cumulative_cases));
  let dates = countyData.map(alabama => alabama.date);
  return {county, newCases, cumulativeCases, dates };
});
currentCountyName = counties[currentCounty];
}
//Base Drawing
function draw() {
background(100, 100, 255);
let countyData = alabamaCounties[currentCounty];
if (countyData.newCases.length > 0) {
  let maxNewCases = max(countyData.newCases);
  let maxCumulativeCases = max(countyData.cumulativeCases);
  showCountyData(countyData, maxNewCases, maxCumulativeCases);
  drawNewCases(countyData);
  drawTimeline(countyData);
  drawLineCursor();
}
}
//Information Display
function showCountyData(countyData, maxNewCases, maxCumulativeCases) {
  fill(0);
  textFont(latoFont); 
  textSize(24);
  textAlign(LEFT, TOP);
  text("County of Alabama: " + countyData.county, 20, 10);
  textSize(16);
  text("Cumulative Cases: " + countyData.cumulativeCases[countyData.cumulativeCases.length - 1], 20, 40);
  text("New Cases: " + (hoveredNewCases !== null ? hoveredNewCases : ''), 20, 60);
  text("Date: " + (hoveredDate !== null ? hoveredDate : ''), 20, 80);
  textSize(12)
  text("Cycle Counties: Left/Right Arrow", 20, 100)
}
//Data Display
function drawNewCases(countyData) {
for (let i = 0; i < countyData.newCases.length; i++) {
  let x = map(i, 0, countyData.newCases.length, 50, width - 50);
  let y = map(countyData.newCases[i], 0, max(countyData.newCases), height - 50, 50);
fill(255, 0, 0, 150);
noStroke();
ellipse(x, y, 15, 15);
if (dist(mouseX, mouseY, x, y) < 20) {  
  hoveredNewCases = countyData.newCases[i]; 
  hoveredDate = countyData.dates[i];  
}
}
}
//TimeLine Display
function drawTimeline(countyData) {
let years = countyData.dates.map(date => new Date(date).getFullYear());
let minYear = Math.min(...years);
let maxYear = Math.max(...years);
stroke(0);
line(50, height - 40, width - 50, height - 40);  
fill(0);
textSize(10);
textAlign(CENTER, CENTER);
for (let year = minYear; year <= maxYear; year++) {
  let x = map(year, minYear, maxYear, 50, width - 50);  
  text(year, x, height - 30);  
}
}
//County Cycler
function keyPressed() {
if (keyCode === LEFT_ARROW) {
  if (currentCounty > 0) {
    currentCounty--;  
  }
} else if (keyCode === RIGHT_ARROW) {
  if (currentCounty < counties.length - 1) {
    currentCounty++; 
  }
}
currentCountyName = counties[currentCounty];  
}
//LineCursor
function drawLineCursor() {
  stroke(1);
  line(mouseX, 0, mouseX, height - 40);
}
