if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

Asteroids.Game = function(width, height, bg) {
  this.width = width;
  this.height = height;
  this.asteroids = this.addAsteroids();
  this.ship = new Asteroids.Ship({ pos: this.randomPosition(), game: this });
  this.bullets = [];
  this.bg = bg;
}

Asteroids.Game.NUM_ASTEROIDS = 0;

Asteroids.Game.prototype.addAsteroids = function () {
  var new_asteroids = [];
  for (var i = 0; i < Asteroids.Game.NUM_ASTEROIDS; i++) {
    var temp_asteroid = {
      pos: this.randomPosition(),
      game: this
    };
    new_asteroids.push(new Asteroids.Asteroid(temp_asteroid));
  }

  return new_asteroids;
};

Asteroids.Game.prototype.randomPosition = function () {
  var pos = [];
  pos[0] = Math.random() * this.width;
  pos[1] = Math.random() * this.height;
  return pos;
};

Asteroids.Game.prototype.draw = function (ctx) {
  ctx.drawImage(this.bg, 0, 0);
  this.allObjects().forEach(function(el) {
    el.draw(ctx);
  });
}

Asteroids.Game.prototype.moveObjects = function () {
  this.allObjects().forEach(function(el) {
    el.move();
  });
}

Asteroids.Game.prototype.wrap = function (pos, objRadius) {
  var startX = pos[0];
  var startY = pos[1];


  var x = (pos[0] % (this.width + objRadius));
  var y = (pos[1] % (this.height + objRadius));


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
}

Asteroids.Game.prototype.checkCollisions = function () {
  for (var i = 0; i < this.allObjects().length; i++) {
    for (var j = i+1; j < this.allObjects().length; j++) {
      if ( this.allObjects()[i].isCollidedWith(this.allObjects()[j]) ) {
        this.allObjects()[i].collideWith(this.allObjects()[j]);
      }
    }
  }
}

Asteroids.Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
}


Asteroids.Game.prototype.remove = function (object) {
  if (object instanceof Asteroids.Asteroid) {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i] === object) {
        var index = i;
      }
    }
    this.asteroids.splice(index, 1);
  } else {

    for (var i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i] === object) {
        var index = i;
      }
    }

    this.bullets.splice(index, 1);
  }
}

Asteroids.Game.prototype.add = function (obj) {
  if (obj instanceof Asteroids.Asteroid) {
    this.asteroids.push(obj);
  } else {
    this.bullets.push(obj);
  }
};

Asteroids.Game.prototype.allObjects = function () {
  return this.bullets.concat(this.asteroids).concat([this.ship]);
}

Asteroids.Game.prototype.isOutOfBounds = function(pos, objRadius) {
  var x = pos[0];
  var y = pos[1];
  if (x > (this.width + objRadius) || x < (0 - objRadius)) {
    return true;
  } else if (y > (this.height + objRadius) || y < (0 - objRadius)) {
    return true;
  } else {
    return false;
  }
}
