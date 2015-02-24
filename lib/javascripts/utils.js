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

Asteroids.Util.sin = function(angle) {
  return Math.sin(angle * (Math.PI / 180));
};

Asteroids.Util.cos = function(angle) {
  return Math.cos(angle * (Math.PI / 180));
};

Asteroids.Util.toRadians = function(angle) {
  return angle * (Math.PI / 180);
};

Asteroids.Util.randomVec = function(magnitude, angle) {
  var xVec = Asteroids.Util.sin(angle) * magnitude
  var yVec = Asteroids.Util.cos(angle) * magnitude

  return [xVec, yVec];
}
