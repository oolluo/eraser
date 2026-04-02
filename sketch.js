let drawing = false;
let eraserX = 300;
let eraserY = 300;
let canvas;
let interval = 0;
let timer = 0;
let randomXSpeed = 0;
let randomYSpeed = 0;

function mousePressed() {
  drawing = true;
}

function mouseReleased() {
  drawing = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  canvas = createGraphics(windowWidth, windowHeight);
  canvas.background(128);
  interval = random(1000, 3000);
  randomXSpeed = random() - 0.5;
  randomYSpeed = random() - 0.5;
}

function draw() {
  if (drawing) {
    canvas.stroke(0);
    canvas.strokeWeight(4);
    canvas.line(mouseX, mouseY, pmouseX, pmouseY);
  }

  image(canvas, 0, 0);

  // every 1 to 3 seconds, eraser decides where/whether it move
  if (millis() - timer > interval) {
    if (random() < 0.2) {
      randomXSpeed = 0;
      randomYSpeed = 0;
    } else {
      randomXSpeed = random() - 0.5;
      randomYSpeed = random() - 0.5;
    }

    timer = millis();
    interval = random(1000, 3000);
  }

  // move eraser
  eraserX += randomXSpeed;
  eraserY += randomYSpeed;

  // set boundaries for eraser
  if (eraserX < 0) {
    eraserX = 0;
  }
  if (eraserX > windowWidth - 55) {
    eraserX = windowWidth - 55;
  }
  if (eraserY < 0) {
    eraserY = 0;
  }
  if (eraserY > windowHeight - 30) {
    eraserY = windowHeight - 30;
  }

  drawPencil(mouseX, mouseY);
  drawEraser(eraserX, eraserY);
}

function drawEraser(x, y) {
  noStroke();
  canvas.noStroke();

  // eraser chilling
  if (randomXSpeed === 0 && randomYSpeed === 0) {
    fill("#554400");
    rect(x, y, 30, 20);
    fill("#c0c0c0");
    rect(x + 30, y, 15, 20);
  }

  // eraser face right and moving
  if (randomXSpeed > 0) {
    // erase the drawing
    canvas.fill(128);
    canvas.rect(x + 30, y, 15, 20);

    // draw eraser
    fill("#554400");
    rect(x, y, 30, 20);
    fill("#c0c0c0");
    rect(x + 30, y, 15, 20);
  }

  // eraser face left and moving
  if (randomXSpeed < 0) {
    // erase the drawing
    canvas.fill(128);
    canvas.rect(x, y, 15, 20);

    // draw eraser
    fill("#554400");
    rect(x + 15, y, 30, 20);
    fill("#c0c0c0");
    rect(x, y, 15, 20);
  }

  pop();
}

function drawPencil(x, y) {
  push();

  translate(x, y);
  rotate(-PI / 8);

  noStroke();
  fill("#332200");
  rect(-4, 8, 8, 16);

  fill("#000");
  rect(-2, 0, 4, 8);

  pop();
}
