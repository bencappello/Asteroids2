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
  this.intervalID = setInterval(gameCycle.bind(this), 2);
};

GameView.prototype.bindKeyHandlers = function() {
  this.keyState = {};
  var that = this
  window.addEventListener('keydown',function(e){
      that.keyState[e.keyCode || e.which] = true;
  },true);
  window.addEventListener('keyup',function(e){
      that.keyState[e.keyCode || e.which] = false;
  },true);
  var ship = currentGame.ship;
  this.shipFire = _.throttle(ship.fireBullet.bind(ship), 100, {trailing: false});
  this.addAsteroid = _.throttle(ship.fireBullet.bind(ship), 100, {trailing: false});
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
