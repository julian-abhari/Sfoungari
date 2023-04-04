var forceIncrement = 0.02;
var timeIncrement = 0.02;
var gridScale = 20;
var columns;
var rows;
var time = 0;

var flowfield;
var particles = [];

function setup() {
  background(255);
  pixelDensity(3);
  createCanvas(800, 500, WEBGL);
  colorMode(HSB, 100);

  columns = floor(width / gridScale);
  rows = floor(height / gridScale);
  flowfield = new Array(columns * rows);

  for (var x = 0; x < columns; x += 1) {
    for (var y = 0; y < rows; y += 1) {
      particles[x + y * columns] = new Particle(x * gridScale, y * gridScale);
    }
  }
}

function draw() {
  background(255);
  translate(-width / 2, -height / 2, 0);

  var xOffset = 0;
  for (var x = 0; x < columns; x += 1) {
    var yOffset = 0;
    for (var y = 0; y < rows; y += 1) {
      var index = (x + y * columns);
      var angle = map(noise(xOffset, yOffset, time), 0, 1, -2*PI, 2*PI);
      var vector = p5.Vector.fromAngle(angle);
      flowfield[index] = vector;
      yOffset += forceIncrement;
    }
    xOffset += forceIncrement;
  }
  time += timeIncrement;

  for (var i = 0; i < particles.length; i += 1) {
    particles[i].update();
    particles[i].edges();
    particles[i].show(flowfield);
  }
}
