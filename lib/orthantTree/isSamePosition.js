module.exports = function isSamePosition(point1, point2) {
  for (var i = 0; i < point1.length; ++i) {
    if (Math.abs(point1[i] - point2[i]) > 1e-8) return false;
  }
  return true;
};
