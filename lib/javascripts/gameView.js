if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var GameView = Asteroids.GameView = function(ctx) {
  this.ctx = ctx;
};

GameView.prototype.start = function() {
  this.bindKeyHandlers();
  var gameCycle = function() {
    this.assessKeys();
    currentGame.draw(this.ctx);
    currentGame.step();
  };
  this.intervalID = setInterval(gameCycle.bind(this), Frame_Rate);
};

GameView.prototype.bindKeyHandlers = function() {
  this.keyState = {};
  var that = this
  this.downKeyState = function(e) {
      that.keyState[e.keyCode || e.which] = true;
  }
  this.upKeyState = function(e) {
      that.keyState[e.keyCode || e.which] = false;
  }
  var ship = currentGame.ship;
  this.shipFire = _.throttle(ship.fireBullet.bind(ship), 150, {trailing: false});
};

GameView.prototype.assessKeys = function() {
  //up
  if (this.keyState[38]) {
    currentGame.ship.power(-1);
  }
  //down
  if (this.keyState[40]) {
    currentGame.ship.power(1);
  }
  //left
  if (this.keyState[37]) {
    currentGame.ship.rotate(-1);
  }
  //right
  if (this.keyState[39]) {
    currentGame.ship.rotate(1);
  }
  //space
  if (this.keyState[32]) {
    this.shipFire();
  }
};
