if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

Asteroids.GameView = function(ctx, game) {
  this.game = game,
  this.ctx = ctx;
}


Asteroids.GameView.prototype.start = function() {
  this.bindKeyHandlers();
  var gameCycle = function() {
    this.assessKeys();
    this.game.draw(this.ctx);
    this.game.step();
  };

  window.setInterval(gameCycle.bind(this), 2);
}

Asteroids.GameView.prototype.bindKeyHandlers = function() {
  this.keyState = {};
  var that = this
  window.addEventListener('keydown',function(e){
      that.keyState[e.keyCode || e.which] = true;
  },true);
  window.addEventListener('keyup',function(e){
      that.keyState[e.keyCode || e.which] = false;
  },true);
  var ship = this.game.ship;
  this.shipFire = _.throttle(ship.fireBullet.bind(ship), 100, {trailing: false});
};

Asteroids.GameView.prototype.assessKeys = function() {
  //up
  if (this.keyState[38]) {
    this.game.ship.power(-1);
  }
  //down
  if (this.keyState[40]) {
    this.game.ship.power(1);
  }
  //left
  if (this.keyState[37]) {
    this.game.ship.rotate(-1);
  }
  //right
  if (this.keyState[39]) {
    this.game.ship.rotate(1);
  }
  //space
  if (this.keyState[32]) {
    this.shipFire();
  }
};
