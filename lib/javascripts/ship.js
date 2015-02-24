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

Ship.prototype.angleToRadians = function(angle) {
  return angle * (Math.PI / 180);
};

Ship.prototype.power = function (direction) {
  var that = this
  var xVector = Math.cos(Asteroids.Util.toRadians(that.angle)) * direction * 0.3;
  var yVector = Math.sin(Asteroids.Util.toRadians(that.angle)) * direction * 0.3;

  console.log('X' + xVector)
  console.log('Y' + yVector)
  this.vel[0] += xVector;
  this.vel[1] += yVector;
};

Ship.prototype.fireBullet = function () {
  var xFunc = (this.vel[0] / Math.abs(this.vel[0]))
  var yFunc = (this.vel[1] / Math.abs(this.vel[1]))

  //if xFunc !== xFunc it means that xFunc is NaN because that
  //velocity coordinate was 0 and, therefore, the function divided by 0
  var xSign = xFunc !== xFunc ? 0 : xFunc
  var ySign = yFunc !== yFunc ? 0 : yFunc
  var dX = null
  var dY = null

  if (this.vel[0] == 0 && this.vel[1] == 0) {
    dX = 0;
    dY = -1;
  } else {
    dX = (this.vel[0]*1.5) + (xSign * 2);
    dY = (this.vel[1]*1.5) + (ySign * 2);
  }

  var new_bullet = new Asteroids.Bullet({
    pos: this.pos,
    vel: [dX, dY],
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
  ctx.rotate(this.angleToRadians(this.angle));

  //draws image at the center point of the screen since
  //that was temporarily reset as the ctx origin point
  ctx.drawImage(this.img, 0 - this.radius, 0 - this.radius, this.radius*2, this.radius*2);

  //then resets the context origin to the top left corner of the screen
  //after the ship is drawn
  ctx.restore();
};
