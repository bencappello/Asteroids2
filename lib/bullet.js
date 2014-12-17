if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Bullet = Asteroids.Bullet = function (obj) {
  obj.radius = Bullet.RADIUS;
  obj.color = Bullet.COLOR;
  Asteroids.movingObject.call(this, obj);
  this.ass = new Image();
  this.ass.src = 'lib/fireball.png';
}

Bullet.RADIUS = 10;
Bullet.COLOR = "orange";

Asteroids.Util.inherits(Bullet, Asteroids.movingObject);

Bullet.prototype.isWrappable = false;

Asteroids.Bullet.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Asteroids.Asteroid) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};

Bullet.prototype.draw = function (ctx) {
  ctx.drawImage(this.ass, this.pos[0]-this.radius, this.pos[1]-this.radius, this.radius*2, this.radius*2);
};
