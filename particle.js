function Particle(x, y) {
  this.position = createVector(x, y, 0);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.maxSpeed = 2;
  this.colorCount = 0;

  this.previousPosition = this.position.copy();

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
    this.position.add(this.velocity);
  }

  this.follow = function(vectors) {
    var x = floor(this.position.x / gridScale);
    var y = floor(this.position.y / gridScale);

    var index = x + y * columns;
    var force = vectors[index];
    if (force != null) {
      this.applyForce(force);
    }
  }

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.show = function(vectors) {
    var x = floor(this.position.x / gridScale);
    var y = floor(this.position.y / gridScale);
    var index = x + y * columns;
    var force = vectors[index];

    if (force != null) {
      this.colorCount = map(force.x, -1, 1, 0, 85);
    }

    push();
    translate(this.position.x, this.position.y, map(force.x, -1, 1, -100, 150));
    fill (this.colorCount, 255, 255);
    stroke(this.colorCount, 255, 255, 1);
    strokeWeight(1);
    sphere(5);
    this.updatePreviousPostion();
    pop();
  }

  this.edges = function() {
    if (this.position.x > width) {
      this.position.x = 0;
      this.updatePreviousPostion();
    }
    if (this.position.x < 0) {
      this.position.x = width;
      this.updatePreviousPostion();
    }
    if (this.position.y > height) {
      this.position.y = 0;
      this.updatePreviousPostion();
    }
    if (this.position.y < 0) {
      this.position.y = height;
      this.updatePreviousPostion();
    }
  }

  this.updatePreviousPostion = function() {
    this.previousPosition.x = this.position.x;
    this.previousPosition.y = this.position.y;
  }
}
