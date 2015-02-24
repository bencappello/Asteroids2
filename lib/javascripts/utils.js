if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

if (typeof Asteroids.Util === "undefined") {
  window.Asteroids.Util = {};
}

Asteroids.Util.inherits = function (childClass, parentClass) {
  function Surrogate() {};
  Surrogate.prototype = parentClass.prototype;
  childClass.prototype = new Surrogate();
};

Asteroids.Util.toRadians = function(angle) {
  return angle * (Math.PI / 180);
};


Asteroids.Util.randomVec = function(length) {
  var vec = [];
  rand = Math.random();
  var xdir = rand * length
  var ydir = (1 - rand) * length

  var xsign = Math.random();
  var ysign = Math.random();

  vec[0] = xsign > 0.5 ? xdir : xdir * -1;
  vec[1] = ysign > 0.5 ? ydir : ydir * -1;
  return vec;
}
