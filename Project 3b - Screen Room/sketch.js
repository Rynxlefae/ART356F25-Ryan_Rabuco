//playlist Values
let playlistX = 1000;
let playlistY = 450;
let playlistR = 17;
let songs = [];
let currentSong = 0;

//Weather Values
let changeWeatherX = 250;
let changeWeatherY = 700;
let changeWeatherR = 300;
let weather = ["daytime", "nighttime", "rainyday"];
let currentWeather;
let previousWeather;
//Rain
let rainDroplets = [];
let isRainSoundPlaying = false;

//Lamp Values
let flickLampX = 470;
let flickLampY = 366;
let flickLampR = 40;
let lightLevel = ["on", "off"];
let lightFlipped = false;

//Curtain Values
let curtainX = 950;
let curtainY = 130;
let curtainR = 300;
let curtainState = ["on", "off"];
let curtainMoved = false;

//Pikmin Values
let pikX = 186;
let pikY = 164;
let pikR = 50;

//Room Values
let roomColor;

let fading = 0;  
let closeEyes = 3;   
let fallAsleep = true; 
let sleeping = false; 

//Hint Values
let showHints = false; 
let hintX = 535;
let hintY = 130;
let hintR = 105;

//Images
let room;
let city;
let sun;
let moon;
let curtains;
let lamp_on;
let lamp_off;
let lightSwitch_on;
let lightSwitch_off;
let song1Play;
let song1Stop;
let song2Play;
let song2Stop;
let song3Play;
let song4Stop;
let clockTime;
let hint;

//Preload
function preload(){
room = loadImage('room_images/room.jpg');
city = loadImage('room_images/cityscape.png');
sun = loadImage('room_images/sun.png');
moon = loadImage('room_images/moon.png');
curtains = loadImage('room_images/curtains.png');
lampOn = loadImage('room_images/lamp_on.png');
lampOff = loadImage('room_images/lamp_off.png');
lightSwitch_on = loadImage('room_images/lightswitchon.png');
lightSwitch_off = loadImage('room_images/lightswitchoff.png');
song1Play = loadImage('room_images/song1play.png');
song2Play = loadImage('room_images/song2play.png');
song3Play = loadImage('room_images/song3play.png');
song1Stop = loadImage('room_images/song1stop.png');
song2Stop = loadImage('room_images/song2stop.png');
song3Stop = loadImage('room_images/song3stop.png');
clockTime = loadImage('room_images/clock.png');
hint = loadImage('room_images/hintSign.png');

songs.push(loadSound('sounds/3-31 (P3R ver.).mp3'));
songs.push(loadSound('sounds/Gogo No Nemuri.mp3'));
songs.push(loadSound('sounds/Title Theme Pikmin 4 OST.mp3'));

pikminNoise = loadSound('sounds/PIKMIN.mp3');
flickOn = loadSound('sounds/flickOn.mp3');
flickOff = loadSound('sounds/flickOff.mp3');
curtainOpen = loadSound('sounds/curtainOpen.mp3');
curtainClosed = loadSound('sounds/curtainClose.mp3');
rainASMR = loadSound('sounds/rainFall.mp3');
}





//Base Setup
function setup() {
createCanvas(1200, 800);
latoFont = loadFont('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
  roomColor = color(100, 100, 255);
//Weather Setup
const weatherType = {
  daytime: daytime,
  nighttime: nighttime,
  rainyday: rainyday
};
let currentOutside = random(weather);
  currentWeather = new weatherType[currentOutside]();
//Rain Setup
for (let i = 0; i < 500; i++) {
let x = random(width);
let y = random(height);
let c = new rain(
  color(255),
  x,
  y,
  random(15)
);
rainDroplets.push(c);
}
//Clock Setup
digitalClock = new clock();
}

//Base Drawing
function draw() {
currentWeather.cast();
image(hint, 415, -50, 240, 240);
image(clockTime, 680, 440, 519 / 5, 208 / 5);
digitalClock.time();
laptop();
curtainButton();
lampButton();

textSize(30);
fill(255, 255, 255, 100);
textFont(latoFont); 
text("Need a hint?", 530, 130);
text("Click Here!", 530, 155);

if (showHints == true) {
  hints();
}
if (sleeping) {
  sleepTransition();
}
}

//Weather Classes
class daytime {
cast() {
  fill(135, 206, 235, 255); 
  rect(600, 0, 600, 600);
image(city, 650, 30, 550, 550);
image(room, -89, -50, width * 1.11, height * 1.11)
 }
}
class nighttime {
cast() {
  fill(20, 24, 82, 255);
  rect(600, 0, 600, 600);
image(moon, 1050, 100, 80, 80);
image(city, 650, 30, 550, 550);
image(room, -89, -50, width * 1.11, height * 1.11);
 }
}
class rainyday {
cast() {
  fill(128, 128, 228, 255);
  rect(600, 0, 600, 600);
image(city, 650, 30, 550, 550);
  fill(255);
  noStroke();
  rainfall();
image(room, -89, -50, width * 1.11, height * 1.11);
if (!isRainSoundPlaying) {
  rainASMR.setVolume(0.25); 
  rainASMR.play();
  isRainSoundPlaying = true; 
  }
 }
}

function mousePressed(){
let dLamp = dist(mouseX, mouseY, flickLampX, flickLampY);
if (dLamp < flickLampR) {
  lightFlipped = true;  
}
let dCurtains = dist(mouseX, mouseY, curtainX, curtainY);
if (dCurtains < curtainR) {
  curtainMoved = true;  
}
let dHint = dist(mouseX, mouseY, hintX, hintY);
if (dHint < hintR) {
if (showHints) {
  showHints = false;
} else {
  showHints = true;
}
}
weatherButton();
playlistButton();
pikminButton();
}


// Lamp Button
function lampButton(){
let dLamp = dist(mouseX, mouseY, flickLampX, flickLampY);
if (dLamp < flickLampR && lightFlipped) {

if (lightLevel[0] === "on") {
  lightLevel[0] = "off";
flickOff.setVolume(0.50); 
flickOff.play();
} else {
  lightLevel[0] = "on"; 
flickOn.setVolume(0.50); 
flickOn.play();
} lightFlipped = false; }
if (lightLevel[0] === "on") {
  fill(255, 187, 0, 30);  
image(lampOn, 450, 270, 300, 300)
image(lightSwitch_on , 450, 340, 101 /3, 157 /3)
} else {
fill(0, 0, 0, 150); 
image(lampOff, 450, 270, 300, 300)
image(lightSwitch_off , 450, 340, 101 /3, 157 /3)

}
rect(0, 0, width, height);
} 

// Weather Button
function weatherButton() {
let dWeather = dist(mouseX, mouseY, changeWeatherX, changeWeatherY);
  if (dWeather < changeWeatherR) {
  let newWeather = random(weather);
  sleeping = true
while (newWeather === previousWeather) {
  newWeather = random(weather);
} previousWeather = newWeather;
if (newWeather !== "rainyday") {
  isRainSoundPlaying = false;  
  rainASMR.stop(); 
}
const weatherType = {
  daytime: daytime,
  nighttime: nighttime,
  rainyday: rainyday
};
currentWeather = new weatherType[newWeather]();
 } 
}

// Weather Transition
function sleepTransition() {

if (fallAsleep) {
fading = 255;
if (fading >= 255) {
  fallAsleep = false; 
 }
} else {
fading -= closeEyes; 
if (fading <= 0) {
  fallAsleep = true; 
  sleeping = false; 

 }
} 

fill(0, fading); 
noStroke();
rect(0, 0, width, height); 
}

function playlistButton() {

let dListen = dist(mouseX, mouseY, playlistX, playlistY);
  if (dListen < playlistR) {
if (songs[currentSong].isPlaying()) {
  songs[currentSong].stop();
} else {
songs[currentSong].play();
 }
}

let dNext= dist(mouseX, mouseY, playlistX - 30, playlistY);
  if (dNext < playlistR) {
songs[currentSong].stop()
  currentSong++;
songs[currentSong].play();
}

let dPrev = dist(mouseX, mouseY, playlistX + 30, playlistY);
  if (dPrev < playlistR) {
  songs[currentSong].stop()
  currentSong--;
  songs[currentSong].play();
}
}

//Laptop Screen
function laptop(){
if (currentSong === 0) {
  if (songs[currentSong].isPlaying()) {
  image(song1Play, 945, 423, 110, 68)
  songs[currentSong].setVolume(0.25)
} else {
  image(song1Stop, 945, 423, 110, 68)
 }
}
if (currentSong === 1) {
  if (songs[currentSong].isPlaying()) {
  image(song2Play, 945, 423, 110, 68)
} else {
  image(song2Stop, 945, 423, 110, 68)
 }
}
if (currentSong === 2) {
  if (songs[currentSong].isPlaying()) {
  image(song3Play, 945, 423, 110, 68)
  songs[currentSong].setVolume(0.25)
} else {
  image(song3Stop, 945, 423, 110, 68)
 }
}

if (currentSong > 2) {
  currentSong = 0;
songs[currentSong].play();
} else if (currentSong < 0) {
  currentSong = 2;
songs[currentSong].play();
 }
}

//Curtain Button
function curtainButton(){
let dCurtains = dist(mouseX, mouseY, curtainX, curtainY);
if (dCurtains < curtainR && curtainMoved) {

if (curtainState[0] === "on") {
  curtainState[0] = "off";
curtainClosed.setVolume(0.50); 
curtainClosed.play();
} else {
  curtainState[0] = "on"; 
curtainOpen.setVolume(0.50); 
curtainOpen.play();
}
  curtainMoved = false;
}
if (curtainState[0] === "on") {
  image(curtains, 600, -70, 703, 510)
} else {
  image(curtains, 1050, -70, 703, 510)
 }
}

// Pikmin Button
function pikminButton() {
let pRadio = dist(mouseX, mouseY, pikX, pikY);
  if (pRadio < pikR) {
  pikminNoise.setVolume(0.50); 
  pikminNoise.play();
 }
}

//Clock Class
class clock{
time(){ 
let h = hour();
let m = minute();
let s = second();
let mo = month();
let d = day();
let period = "AM";

if (h >= 12) {
  period = "PM";
}
if (h > 12) {
  h = h - 12; 
}
if (h === 0) {
  h = 12;
}
noStroke();
fill(255);
textFont(latoFont); 
textSize(10);
textAlign(CENTER);
text(mo + " / " + d, 730, 475);
textSize(20);
text(nf(h, 2) + ":" + nf(m, 2) + ":" + period, 730, 465);
}
}

//Rain Class
function rainfall(){
  for (let i = 0; i < rainDroplets.length; i++) {
  rainDroplets[i].fall();
  rainDroplets[i].display();
 }
}
class rain {
constructor(tempC, tempXpos, tempYpos, tempYspeed) {
  this.c = tempC;
  this.xpos = random(600, 1200); 
  this.ypos = random(0, 400);
  this.yspeed = tempYspeed;
  }
display() {
  fill(this.c);
  ellipse(this.xpos, this.ypos, 2, 10);
  }
fall() {
  this.ypos = this.ypos + this.yspeed;
  if (this.ypos > height -300) {
    this.ypos = 0;
  }
 }
}

//Hint Function
function hints() {
fill(100, 200, 100, 100);
  ellipse(hintX, hintY, hintR * 2); 
  ellipse(pikX, pikY, pikR * 2);  
  ellipse(playlistX, playlistY, playlistR * 2); 
  ellipse(playlistX - 30, playlistY, playlistR * 1.5); 
  ellipse(playlistX + 30, playlistY, playlistR * 1.5);
  ellipse(curtainX, curtainY, curtainR * 2); 
  ellipse(changeWeatherX, changeWeatherY, changeWeatherR * 2); 
  ellipse(flickLampX, flickLampY, flickLampR * 2);
}


