let maxTime; // Total time to display (in seconds)
let mirrorCheckbox, newspaperCheckbox, watchCheckbox;
let canvas;
let hasMirror, hasNewspaper, hasWatch;

function setup() {
  canvas = createCanvas(800, 500);
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
  let yVis = 140;
  let yInvis = 90;

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
  counterMax = hasWatch ? 29 : 26;
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

function drawDot(x, y, size) {
  fill(color("#a56f8e"));
  noStroke();
  circle(x, y, size);
}

function resetGraphs() {
  clear();
  timeIncrement = 0.25; // Reset the time
  counter = 0; // Reset the counter
  setupGraph1();
  setupGraph2();
  loop(); // Restart the draw loop
}

function setupGraph1() {
  fill(255);
  let maxTime = 6;
  // draw axes
  push();
  stroke(255);
  strokeWeight(5);
  line(90, 190, width - 30, 190); // x-axis
  line(90, 190, 90, 50); // y-axis
  pop();

  // for loop for x-axis incrementation
  for (let t = 0.25; t <= maxTime; t += 0.25) {
    let x = map(t, 0, maxTime, 90, width - 50);
    // draw tick marks
    push();
    stroke(255);
    strokeWeight(4);
    line(x, 193, x, 190);
    pop();
    push();
    stroke(255);
    strokeWeight(1);
    line(x, 190, x, 50);
    pop();
    // write time labels for x-axis
    push();
    translate(x, 200);
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
  text("invisible", 80, 90);
  text("visible", 80, 140);
  pop();
  push();
  textSize(14);
  text("seconds", 400, 245);
  pop();
}

function setupGraph2() {
  fill(255);
  maxTime = 6;

  // draw axes
  push();
  stroke(255);
  strokeWeight(5);
  line(90, height - 90, width - 30, height - 90); // x-axis
  line(90, height - 90, 90, height - 240); // y-axis
  pop();

  //   for (let t = 0.1; t <= maxTime; t += 0.1) {
  //     let x = map(t, 0, maxTime, 90, width - 50);
  //     // draw tick marks
  //     push();
  //     stroke(255);
  //     strokeWeight(2);
  //     line(x, height - 105, x, height - 95);
  //     pop();
  //   }
  // for loop for x-axis incrementation
  for (let t = 0.25; t <= maxTime; t += 0.25) {
    let x = map(t, 0, maxTime, 90, width - 50);
    // draw tick marks
    push();
    stroke(255);
    strokeWeight(4);
    line(x, height - 90, x, height - 87);
    pop();
    push();
    stroke(255);
    strokeWeight(1);
    line(x, height - 90, x, height - 240);
    pop();
    // write time labels for x-axis
    push();
    translate(x, height - 80);
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
  text("invisible", 80, height - 190);
  text("visible", 80, height - 140);
  pop();
  push();
  textSize(14);
  text("seconds", 400, height - 35);
  pop();
}
