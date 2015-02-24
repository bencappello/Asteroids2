if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Bullet = Asteroids.Bullet = function (obj) {
  obj.radius = Bullet.RADIUS;
  obj.color = Bullet.COLOR;
  Asteroids.movingObject.call(this, obj);
  this.img = new Image();
  this.img.src = 'lib/images/fireball.png';
}

Bullet.RADIUS = 5;
Bullet.COLOR = "orange";

Asteroids.Util.inherits(Bullet, Asteroids.movingObject);

Bullet.prototype.isWrappable = false;

Asteroids.Bullet.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Asteroids.Asteroid) {

    if (otherObject.radius >= 20) {
      var asteroid_1 = {
        pos: otherObject.pos,
        vel: Asteroids.Util.randomVec((otherObject.magnitude * 0.8), (otherObject.direction + 30)),
        rotation: otherObject.rotation,
        radius: otherObject.radius * RadiusReduction
      };
      var asteroid_2 = {
        pos: otherObject.pos,
        vel: Asteroids.Util.randomVec((otherObject.magnitude * 0.8), (otherObject.direction - 30)),
        rotation: otherObject.rotation,
        radius: otherObject.radius * RadiusReduction
      };
      currentGame.asteroids.push(new Asteroids.Asteroid(asteroid_1));
      currentGame.asteroids.push(new Asteroids.Asteroid(asteroid_2));
    }

    currentGame.remove(otherObject);
    currentGame.remove(this);
  }
};

Bullet.prototype.draw = function (ctx) {
  ctx.drawImage(this.img, this.pos[0]-this.radius, this.pos[1]-this.radius, this.radius*2, this.radius*2);
};
