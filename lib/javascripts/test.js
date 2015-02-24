var wrap = function (pos) {
  var asteroidRadius = 30;
  var startX = pos[0];
  var startY = pos[1];


  var x = (pos[0] % (500 + asteroidRadius));
  var y = (pos[1] % (500 + asteroidRadius));


  if (x !== startX) {
    x -= asteroidRadius;
  }

  if (y !== startY) {
    y -= asteroidRadius;
  }

  if (x < (-1 * asteroidRadius)) {
    x = 500 + ((2 * asteroidRadius) + x);
  }

  if (y < (-1 * asteroidRadius)) {
    y = 500 + ((2 * asteroidRadius) + y);
  }

  return [x,y];
}
