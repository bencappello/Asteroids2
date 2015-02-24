if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

Asteroids.GameView = function(ctx, game) {
  this.game = game,
  this.ctx = ctx;
}


Asteroids.GameView.prototype.start = function() {
  var gameCycle = function() {
    this.game.draw(this.ctx);
    this.game.step();
  };

  this.bindKeyHandlers();
  window.setInterval(gameCycle.bind(this), 2);
}


Asteroids.GameView.prototype.bindKeyHandlers = function() {
  key('up', (function() {
    this.game.ship.power(-1)
  }).bind(this));

  key('down', (function() {
    this.game.ship.power(1)
  }).bind(this));

  key('left', (function() {
    this.game.ship.rotate(-1)
  }).bind(this));

  key('right', (function() {
    this.game.ship.rotate(1)
  }).bind(this));

  key('space', (function() {
    this.game.ship.fireBullet()
  }).bind(this));
}
