if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Ship = Asteroids.Ship = function (obj) {
  obj.radius = Ship.RADIUS;
  obj.color = Ship.COLOR;
  obj.vel = [0,0];
  Asteroids.movingObject.call(this, obj);
  this.img = new Image();
  this.img.src = 'lib/directional_ship.png';
}

Asteroids.Util.inherits(Ship, Asteroids.movingObject);
Ship.RADIUS = 20;
Ship.COLOR = "green";

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
}


Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
}

Asteroids.Ship.prototype.fireBullet = function () {
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
  ctx.drawImage(this.img, this.pos[0]-this.radius, this.pos[1]-this.radius, this.radius*2, this.radius*2);
};
