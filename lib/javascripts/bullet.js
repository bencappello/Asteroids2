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
    score += 100;
    $('#score').html(score);

    //split asteroid into 2
    if (otherObject.radius >= 20) {
      var asteroid_1 = {
        pos: otherObject.pos,
        vel: Asteroids.Util.generateVec((otherObject.magnitude * 0.8), (otherObject.direction + 30)),
        rotation: otherObject.rotation,
        radius: otherObject.radius * Radius_Reduction
      };
      var asteroid_2 = {
        pos: otherObject.pos,
        vel: Asteroids.Util.generateVec((otherObject.magnitude * 0.8), (otherObject.direction - 30)),
        rotation: otherObject.rotation,
        radius: otherObject.radius * Radius_Reduction
      };
      currentGame.asteroids.push(new Asteroids.Asteroid(asteroid_1));
      currentGame.asteroids.push(new Asteroids.Asteroid(asteroid_2));
    } else if (currentGame.asteroids.length < 20) {
      //spawn new asteroids if field gets thin
      var asteroid = {
        pos: Asteroids.Util.randCorner(),
        radius: 50
      };
      currentGame.asteroids.push(new Asteroids.Asteroid(asteroid));
    }

    //asteroid explosion
    exp_obj = {
      pos: [otherObject.pos[0], otherObject.pos[1]],
      radius: otherObject.radius
    };
    var explosion = new Asteroids.AsteroidExplosion(exp_obj);
    currentGame.asteroid_explosions.push(explosion);
    explosion.explode();

    currentGame.remove(otherObject);
    currentGame.remove(this);
  }
};

Bullet.prototype.draw = function (ctx) {
  ctx.drawImage(this.img,
    Math.floor(this.pos[0]-this.radius),
    Math.floor(this.pos[1]-this.radius),
    this.radius*2,
    this.radius*2
  );
};
