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
  this.rotation = 0.02;
  this.angle = 90;
};

Asteroids.Util.inherits(Ship, Asteroids.movingObject);
Ship.RADIUS = 20;
Ship.COLOR = "green";

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.rotate = function (direction) {
  this.angle += direction * 10;
  console.log(this.angle);
};

Ship.prototype.power = function (direction) {
  var that = this
  var xVector = Asteroids.Util.cos(that.angle) * direction * 0.3;
  var yVector = Asteroids.Util.sin(that.angle) * direction * 0.3;
  this.vel[0] += xVector;
  this.vel[1] += yVector;
};

Ship.prototype.fireBullet = function () {
  var xVector = Asteroids.Util.cos(this.angle) * -1 * 5;
  var yVector = Asteroids.Util.sin(this.angle) * -1 * 5;

  var new_bullet = new Asteroids.Bullet({
    pos: [this.pos[0], this.pos[1]],
    vel: [xVector, yVector],
    game: this.game
  });

  this.game.add(new_bullet)
};

Ship.prototype.draw = function (ctx) {
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
};
