if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Asteroid = Asteroids.Asteroid = function (obj) {
  obj.color = Asteroids.Asteroid.COLOR;
  obj.radius = (Math.random() * 30) + 20;
  obj.vel = Asteroids.Util.randomVec((Math.random() * 1) +1);
  Asteroids.movingObject.call(this, obj);
  this.ass = new Image();
  this.ass.src = 'lib/asteroid.png';
  this.rotation = Math.random() * 0.04;
  this.angle = 0;
};

//Asteroids.Asteroid.COLOR = "purple";
//Asteroids.Asteroid.RADIUS = 30;

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
  console.log(this)
  ctx.translate(this.pos[0], this.pos[1]);
  this.angle += this.rotation
  ctx.rotate(this.angle);

  //draws image at the center point of the screen since
  //that was temporarily reset as the ctx origin point
  ctx.drawImage(this.ass, 0 - this.radius, 0 - this.radius, this.radius*2, this.radius*2);

  //then resets the context origin to the top left corner of the screen
  //after the asteroid is drawn
  ctx.restore();
};
