let maxTime; // Total time to display (in seconds)
let mirrorCheckbox, newspaperCheckbox, watchCheckbox;
let canvas;
let hasMirror, hasNewspaper, hasWatch;
let y1 = 220; // baseline for graph1's axes
let y2 = 90; // baseline for graph2's axes

function setup() {
  canvas = createCanvas(800, 600);
  canvas.parent("canvas-container");
  background(67, 64, 65);
  textFont("National Park");
  setupGraph1();
  setupGraph2();

  // Get the checkboxes from the DOM
  mirrorCheckbox = select("#mirror");
  newspaperCheckbox = select("#newspaper");
  watchCheckbox = select("#watch");

  if (mirrorCheckbox) mirrorCheckbox.changed(resetGraphs);
  if (newspaperCheckbox) newspaperCheckbox.changed(resetGraphs);
  if (watchCheckbox) watchCheckbox.changed(resetGraphs);
}

function draw() {
  drawLingeringGraph();
  drawDemanifestedGraph();
}

function drawLingeringGraph() {
  let counter = 0;
  let maxTime = 6;
  hasMirror = mirrorCheckbox.checked();
  hasNewspaper = newspaperCheckbox.checked();
  let counterMax = hasNewspaper ? 5 : 4;
  let invisMax = counterMax - 2;
  let lingeringTime = hasMirror ? 6 : 4;
  let timeIncrement = 0.25;
  let yVis = y1 - 50;
  let yInvis = y1 - 100;

  while (timeIncrement <= maxTime) {
    let x = map(timeIncrement, 0, maxTime, 90, width - 50); // map time to canvas width
    if (timeIncrement <= lingeringTime) {
      if (counter < counterMax) {
        if (counter <= invisMax) {
          drawDot(x, yInvis, 20);
        } else {
          drawDot(x, yVis, 20);
        }
        counter++;
        timeIncrement += 0.25;
      } else {
        drawDot(x, yVis, 20);
        counter = 0;
        timeIncrement += 0.25;
      }
    } else {
      drawDot(x, yVis, 20);
      timeIncrement += 0.25;
    }
  }
}

function drawDemanifestedGraph() {
  let counter = 0;
  let maxTime = 6;
  hasWatch = watchCheckbox.checked();
  let counterMax = hasWatch ? 29 : 26;
  invisMax = counterMax - 15;
  let timeIncrement = 0.1;
  let yVis = height - 140;
  let yInvis = height - 190;

  while (timeIncrement <= maxTime) {
    let x = map(timeIncrement, 0, maxTime, 90, width - 50); // map time to canvas width
    if (counter < counterMax) {
      if (counter <= invisMax) {
        drawDot(x, yInvis, 10);
      } else {
        drawDot(x, yVis, 10);
      }
      counter++;
      timeIncrement += 0.1;
    } else {
      drawDot(x, yVis, 10);
      counter = 0;
      timeIncrement += 0.1;
    }
  }
}

function setupGraph1() {
  fill(255);
  let maxTime = 6;
  // draw axes
  push();
  stroke(255);
  strokeWeight(5);
  line(90, y1, width - 30, y1); // x-axis
  line(90, y1, 90, y1 - 140); // y-axis
  pop();

  // for loop for x-axis incrementation
  for (let t = 0.25; t <= maxTime; t += 0.25) {
    let x = map(t, 0, maxTime, 90, width - 50);
    // draw tick marks
    push();
    stroke(255);
    strokeWeight(4);
    line(x, y1 + 3, x, y1);
    pop();
    push();
    stroke(255);
    strokeWeight(1);
    line(x, y1, x, y1 - 140);
    pop();
    // write time labels for x-axis
    push();
    translate(x, y1 + 10);
    rotate(-QUARTER_PI);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(14);
    text(t.toFixed(2), 0, 0);
    pop();
  }

  // write labels for y-axis
  push();
  textAlign(RIGHT, CENTER);
  textSize(18);
  text("invisible", 80, y1 - 100);
  text("visible", 80, y1 - 50);
  pop();
  push();
  textSize(14);
  translate(width / 2 + 40, y1 + 50);
  textAlign(CENTER);
  text("timeline (seconds)", 0, 0);
  pop();
  push();
  translate(width / 2 + 40, y1 - 160);
  textSize(20);
  textAlign(CENTER);
  text("post-manifestation lingering invisibility", 0, 0);
  pop();
}

function setupGraph2() {
  fill(255);
  maxTime = 6;

  // draw axes
  push();
  stroke(255);
  strokeWeight(5);
  line(90, height - y2, width - 30, height - y2); // x-axis
  line(90, height - y2, 90, height - (y2 + 150)); // y-axis
  pop();

  // for loop for x-axis incrementation
  for (let t = 0.25; t <= maxTime; t += 0.25) {
    let x = map(t, 0, maxTime, 90, width - 50);
    // draw tick marks
    push();
    stroke(255);
    strokeWeight(4);
    line(x, height - y2, x, height - (y2 - 3));
    pop();
    push();
    stroke(255);
    strokeWeight(1);
    line(x, height - y2, x, height - (y2 + 150));
    pop();
    // write time labels for x-axis
    push();
    translate(x, height - (y2 - 10));
    rotate(-QUARTER_PI);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(15);
    text(t.toFixed(2), 0, 0);
    pop();
  }
  // write labels for y-axis
  push();
  textAlign(RIGHT, CENTER);
  textSize(18);
  text("invisible", 80, height - (y2 + 100));
  text("visible", 80, height - (y2 + 50));
  pop();

  push();
  textSize(14);
  translate(width / 2 + 40, height - (y2 - 50));
  textAlign(CENTER);
  text("timeline (seconds)", 0, 0);
  pop();

  push();
  translate(width / 2 + 40, height - (y2 + 170));
  textSize(20);
  textAlign(CENTER);
  text("demanifested intermittent invisibility", 0, 0);
  pop();
}

function drawDot(x, y, size) {
  fill(color("#a56f8e"));
  noStroke();
  circle(x, y, size);
}

function resetGraphs() {
  clear();
  setupGraph1();
  setupGraph2();
  loop(); // Restart the draw loop
}
