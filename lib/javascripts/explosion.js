if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var ShipExplosion = Asteroids.ShipExplosion = function () {
  this.pos = [0, 0];
  this.radius = 30;
  this.img = new Image();
  this.img.src = 'lib/images/ship_exp_sprite.png';
  this.img_obj = {
    'total_frames': 25,
    'width': 4800,
    'height': 195,
  };
  this.frame = this.img_obj.total_frames + 1;
};

ShipExplosion.prototype.explode = function (callback, pos) {
  var reduce_frame = function() {
    this.frame += 1;
  };
  this.frame = 1;
  this.pos[0] = pos[0];
  this.pos[1] = pos[1];
  Asteroids.Util.repeat(reduce_frame.bind(this), 60, 25, callback);
};

ShipExplosion.prototype.draw = function (ctx) {
  if (this.frame > this.img_obj.total_frames) {
    return
  }
  var xCanvas = this.pos[0];
  var yCanvas = this.pos[1];
  var drawnWidth = this.radius * 2;
  var drawnHeight = this.radius * 2;
  var spriteWidth = this.img_obj.width / this.img_obj.total_frames;
  var spriteHeight = this.img_obj.height;
  var spriteX = spriteWidth * this.frame;
  var spriteY = 0;

  ctx.drawImage(this.img, spriteX, spriteY, spriteWidth, spriteHeight,
    xCanvas, yCanvas, drawnWidth, drawnHeight);
};
