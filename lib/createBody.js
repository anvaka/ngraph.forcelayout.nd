var Vector = require('./vector.js');

module.exports = createBody;

function createBody(pos) {
  return new Body(pos);
}

function Body(pos) {
  this.pos = new Vector(pos);
  this.prevPos = new Vector(pos);
  this.force = new Vector(pos.length);
  this.velocity = new Vector(pos.length);
  this.mass = 1;
}

Body.prototype.setPosition = function () {
  for (var i = 0; i < arguments.length; ++i) {
    this.prevPos[i] = this.pos[i] = arguments[i];
  }
};
