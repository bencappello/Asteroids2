if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Ship = Asteroids.Ship = function (obj) {
  obj.radius = Ship.RADIUS;
  obj.color = Ship.COLOR;
  obj.vel = [0,0];
  Asteroids.movingObject.call(this, obj);
  this.img = new Image();
  this.img.src = 'lib/images/directional_ship.png';
  this.angle = 90;
};

Asteroids.Util.inherits(Ship, Asteroids.movingObject);
Ship.RADIUS = 20;
Ship.COLOR = "green";

Ship.prototype.rotate = function (direction) {
  this.angle += direction * 2;
};

Ship.prototype.power = function (direction) {
  var xVector = Asteroids.Util.cos(this.angle) * direction * 0.01;
  var yVector = Asteroids.Util.sin(this.angle) * direction * 0.01;
  this.vel[0] += xVector;
  this.vel[1] += yVector;
};

Ship.prototype.fireBullet = function () {
  var xVector = Asteroids.Util.cos(this.angle) * -1 * 3;
  var yVector = Asteroids.Util.sin(this.angle) * -1 * 3;

  var new_bullet = new Asteroids.Bullet({
    pos: [this.pos[0], this.pos[1]],
    vel: [xVector, yVector]
  });

  currentGame.add(new_bullet)
};

Ship.prototype.draw = function (ctx) {

  if (!currentGame.shipSuspended) {
    //rotaion code:
    //temporarily resets the ship's current position as the context
    //origin in order to have the whole ctx rotate around that point
    ctx.save();

    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(Asteroids.Util.toRadians(this.angle));

    //draws image at the center point of the screen since
    //that was temporarily reset as the ctx origin point
    ctx.drawImage(this.img, 0 - this.radius, 0 - this.radius, this.radius*2, this.radius*2);

    //then resets the context origin to the top left corner of the screen
    //after the ship is drawn
    ctx.restore();
  }
};
