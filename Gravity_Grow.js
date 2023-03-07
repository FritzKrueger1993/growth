let x = [];
let y = [];
let circleDiameter = [];
let difX = [];
let difY = [];
let gravityX = [];
let gravityY = [];
let mainX;
let mainY;
let mainDiameter;
let displayComp = 5;
let count = 50;
let growing = 0.00005;
let textColor = 255;
let hypo = []; 

function setup() {
  createCanvas (windowWidth - displayComp, windowHeight - displayComp);
  background(0);
  setPos();
} 


function draw() {
 background(0);
 fill(255,255,255,255);
 stroke(0,0,0,50);
 for (i = 0; i<= count; i++) {
  difX[i] = abs(mainX - x[i]);
  difY[i] = abs(mainY - y[i]);
  gravityX[i] = map(difX[i], 0, width, 0.003, 0.000000001);
  gravityY[i] = map(difY[i], 0, height, 0.003, 0.000000001);
  hypo[i] = sqrt( pow(difX[i],2) + pow(difY[i],2) );
  if( hypo[i] <= mainDiameter ) {
    gravityX[i] *= 1.5;
    gravityY[i] *= 1.5;
  }
  x[i] = lerp(x[i], mainX, gravityX[i]);
  y[i] = lerp(y[i], mainY, gravityY[i]);
  if(difX[i] <= mainDiameter * 0.3 && difY[i] <= mainDiameter * 0.3){
  x[i] = random(0, width);
  y[i] = random(0, height);
  }
  circle(x[i],y[i],circleDiameter[i]);
 }
 growing *= 1.003;
 mainDiameter = lerp(mainDiameter, width*4, growing);
 circle(mainX, mainY, mainDiameter); 
 if (mainDiameter >= width*1.7 && mainDiameter >= height*1.7) {
  textColor=lerp(textColor, 0, 0.01 );
  fill(textColor);
  textSize(100);
  textAlign(CENTER, CENTER);
  text('Is there a limit to grwoth?', width/2, height/2);
}
}







function windowResized() {
  resizeCanvas(windowWidth - displayComp, windowHeight - displayComp);
  setPos();
}
  
  
function setPos(){

 for (i = 0; i<= count; i++) {
  x[i] = random(0, width);
  y[i] = random(0, height);
  circleDiameter[i] = random(10,40);
 }
  mainX = random(0, width);
  mainY = random(0, height);
  mainDiameter = 60;
  growing = 0.0001;
  textColor = 255;
}

function mousePressed(){
  setPos();
  fullscreen(1);
}
