if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Game = Asteroids.Game = function(width, height, bg) {
  this.width = width;
  this.height = height;
  this.asteroids = this.addInitialAsteroids();
  this.ship = new Asteroids.Ship({ pos: [this.width/2, this.height/2] });
  this.ship_explosion = new Asteroids.ShipExplosion();
  this.asteroid_explosions = [];
  this.bullets = [];
  this.bg = bg;
  this.shipSuspended = false;
  this.gameOver = false
  $('#new-game-btn').on('click', this.newGame.bind(this));
};

// Game.prototype.loadHighScore = function () {
//   var file = new File('lib/highscores.txt');
//
//   var reader = new FileReader();
//
//   reader.onload = function(e) {
//     console.log('highscore ' + reader.result);
//     // return parseInt(reader.result);
//   }
//
//   reader.readAsText(file);
// };

Game.prototype.reset = function () {
  window.addEventListener('keydown', gameView.downKeyState, true);
  window.addEventListener('keyup', gameView.upKeyState, true);
  this.asteroids = this.addInitialAsteroids();
  this.bullets = [];
  this.ship.pos = [this.width/2, this.height/2];
  this.ship.vel = [0, 0];
  this.ship.angle = 90;
  this.shipSuspended = false;
};

Game.prototype.newGame = function () {
  $('#game-over').toggleClass('hide');
  window.addEventListener('keydown', gameView.downKeyState, true);
  window.addEventListener('keyup', gameView.upKeyState, true);
  score = 0;
  lives = 5;
  this.asteroids = this.addInitialAsteroids();
  this.bullets = [];
  this.ship.pos = [this.width/2, this.height/2];
  this.ship.vel = [0, 0];
  this.ship.angle = 90;
  this.shipSuspended = false;
};

Game.prototype.newLife = function () {
  window.removeEventListener("keydown", gameView.downKeyState, true);
  window.removeEventListener("keyup", gameView.upKeyState, true);
  gameView.keyState = {};
  this.shipSuspended = true;
  lives -= 1;
  if (lives <= 0) {
    this.ship_explosion.explode(function() {
      currentGame.gameOver = true;
      $('#game-over').toggleClass('hide');
    }, this.ship.pos);
  } else {
    this.ship_explosion.explode(this.reset.bind(this), this.ship.pos);
  }
};

Game.prototype.addInitialAsteroids = function () {
  var new_asteroids = [];
  for (var i = 0; i < Num_Asteroids; i++) {
    var temp_asteroid = {
      pos: this.randomPosition()
    };
    new_asteroids.push(new Asteroids.Asteroid(temp_asteroid));
  }

  return new_asteroids;
};

Game.prototype.randomPosition = function () {
  var pos = [];
  var that = this;
  var inCenter = function(x, y) {
    if (x > (that.width * 0.2) &&
        x < (that.width * 0.8) &&
        y > (that.height * 0.2) &&
        y < (that.height * 0.8)) {
      return true;
    } else {
      return false;
    }
  };
  pos[0] = Math.random() * this.width;
  pos[1] = Math.random() * this.height;
  for (var i = 0; inCenter(pos[0], pos[1]); i++) {
    pos[0] = Math.random() * this.width;
    pos[1] = Math.random() * this.height;
  }
  return pos;
};

Game.prototype.draw = function (ctx) {
  ctx.drawImage(this.bg, 0, 0);
  this.allObjects().forEach(function(el) {
    el.draw(ctx);
  });
  this.asteroid_explosions.forEach(function(el) {
    el.draw(ctx);
  });
  this.ship_explosion.draw(ctx);
  ctx.fillText(('Score: ' + score), 10, 30);
  ctx.fillText(('Lives: ' + lives), 10, 60);
  // if (this.gameOver) {
  //   ctx.fillText(('Game Over'), this.width/2 - 75, this.height/2);
  // }
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(function(el) {
    el.move();
  });
};

Game.prototype.wrap = function (pos, objRadius) {
  var startX = pos[0];
  var startY = pos[1];


  var x = (pos[0] % (this.width + objRadius*2));
  var y = (pos[1] % (this.height + objRadius*2));


  if (x !== startX) {
    x -= objRadius;
  }

  if (y !== startY) {
    y -= objRadius;
  }

  if (x < (-1 * objRadius)) {
    x = this.width + ((2 * objRadius) + x);
  }

  if (y < (-1 * objRadius)) {
    y = this.height + ((2 * objRadius) + y);
  }

  return [x,y];
};

Game.prototype.checkCollisions = function () {
  for (var i = 0; i < this.allObjects().length; i++) {
    for (var j = i+1; j < this.allObjects().length; j++) {
      if ( this.allObjects()[i].isCollidedWith(this.allObjects()[j]) ) {
        this.allObjects()[i].collideWith(this.allObjects()[j]);
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};


Game.prototype.remove = function (object) {
  if (object instanceof Asteroids.Asteroid) {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i] === object) {
        var index = i;
      }
    }
    this.asteroids.splice(index, 1);
  } else if (object instanceof Asteroids.Bullet) {
    for (var i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i] === object) {
        var index = i;
      }
    }
    this.bullets.splice(index, 1);
  } else {
    this.asteroid_explosions.shift();
  }
};

Game.prototype.add = function (obj) {
  if (obj instanceof Asteroids.Asteroid) {
    this.asteroids.push(obj);
  } else {
    this.bullets.push(obj);
  }
};

Game.prototype.allObjects = function () {
  var objects = this.bullets.concat(this.asteroids);
  if (this.ship) {
    objects.push(this.ship);
  }
  return objects;
};

Game.prototype.isOutOfBounds = function(pos, objRadius) {
  var x = pos[0];
  var y = pos[1];
  if (x > (this.width + objRadius) || x < (0 - objRadius)) {
    return true;
  } else if (y > (this.height + objRadius) || y < (0 - objRadius)) {
    return true;
  } else {
    return false;
  }
};
