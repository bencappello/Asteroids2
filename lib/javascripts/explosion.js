if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Explosion = Asteroids.Explosion = function () {
  this.pos = [0, 0];
  this.radius = 30;
  this.img = new Image();
  this.img.src = 'lib/images/explosion-spritesheet.png';
  this.img_obj = {
    'total_frames': 25,
    'width': 4800,
    'height': 195,
  };
  this.frame = this.img_obj.total_frames + 1;
};

Explosion.prototype.explode = function (callback, pos) {
  var reduce_frame = function() {
    this.frame += 1;
  };
  this.frame = 1;
  this.pos[0] = pos[0];
  this.pos[1] = pos[1];
  Asteroids.Util.repeat(reduce_frame.bind(this), 75, 25, callback);
};

Explosion.prototype.draw = function (ctx) {
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

  // var img = new Image();
  // img.onload = function () { // Triggered when image has finished loading.
  //     img_obj.source = img;  // we set the image source for our object.
  // }
  // img.src = 'lib/images/explosion-spritesheet.png'; // contains an image of size 256x16
  //                               // with 16 frames of size 16x16

  // function draw_anim(context, x, y, iobj) { // context is the canvas 2d context.
  //     if (iobj.source != null)

  ctx.drawImage(this.img, spriteX, spriteY,
                    spriteWidth, spriteHeight,
                    xCanvas, yCanvas, drawnWidth, drawnHeight);
  // iobj.current = (iobj.current + 1) % iobj.total_frames;
  // incrementing the current frame and assuring animation loop
  // }

  // setInterval((function (c, i) {
  //             return function () {
  //                 draw_anim(c, 10, 10, i);
  //             };
  // })(context, img_obj), 100);

  // function on_body_load() { // <body onload='on_body_load()'>...
  //     var canvas = document.getElementById('canvasElement');
  //                  // <canvas id='canvasElement' width='320' height='200'/>
  //     var context = canvas.getContext("2d");


  // }
};
