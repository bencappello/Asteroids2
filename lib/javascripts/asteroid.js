if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Asteroid = Asteroids.Asteroid = function (obj) {
  obj.color = Asteroids.Asteroid.COLOR;
  obj.radius = (Math.random() * 30) + 20;
  obj.vel = Asteroids.Util.randomVec((Math.random() * 1) +1);
  Asteroids.movingObject.call(this, obj);
  this.img = new Image();
  this.img.src = 'lib/images/asteroid.png';
  this.rotation = Math.random() * 0.04;
  this.angle = 0;
};

Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.movingObject);

Asteroids.Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Asteroids.Ship) {
    otherObject.relocate();
  }
}

Asteroids.Asteroid.prototype.draw = function (ctx) {
  //rotaion code:
  //temporarily resets the asteroid's current position as the context
  //origin in order to have the whole ctx rotate around that point
  ctx.save();
  ctx.translate(this.pos[0], this.pos[1]);
  this.angle += this.rotation
  ctx.rotate(this.angle);

  //draws image at the center point of the screen since
  //that was temporarily reset as the ctx origin point
  ctx.drawImage(this.img, 0 - this.radius, 0 - this.radius, this.radius*2, this.radius*2);

  //then resets the context origin to the top left corner of the screen
  //after the asteroid is drawn
  ctx.restore();
};
