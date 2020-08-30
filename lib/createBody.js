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
  this.springCount = 0;
  this.springLength = 0;
}

Body.prototype.setPosition = function () {
  for (var i = 0; i < arguments.length; ++i) {
    this.prevPos[i] = this.pos[i] = arguments[i];
  }
};

Body.prototype.reset = function () {
  this.force.reset();
  this.springCount = 0;
  this.springLength = 0;
}