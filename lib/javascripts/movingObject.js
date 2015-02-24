if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}


Asteroids.movingObject = function(obj) {
  this.pos = obj.pos,
  this.vel = obj.vel,
  this.radius = obj.radius,
  this.color = obj.color,
  this.game = obj.game;
}

Asteroids.movingObject.prototype.isWrappable = true;

Asteroids.movingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

Asteroids.movingObject.prototype.move = function () {
  var shipPos = this.game.ship.pos
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];

  if (this.game.isOutOfBounds(this.pos, this.radius) && !this.isWrappable) {
    return this.game.remove(this);
  }
  this.pos = this.game.wrap(this.pos, this.radius);
};


Asteroids.movingObject.prototype.isCollidedWith = function (otherObject) {
  var radii = this.radius + otherObject.radius;
  var xDist = this.pos[0] - otherObject.pos[0];
  var yDist = this.pos[1] - otherObject.pos[1];
  var distance = Math.sqrt(Math.pow(xDist,2) + Math.pow(yDist,2));
  return distance < radii;
};

Asteroids.movingObject.prototype.collideWith = function (otherObject) {
};
