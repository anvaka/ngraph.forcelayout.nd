module.exports = function(pos) {
  return new Body4d(pos);
};

function Body4d(pos) {
  this.pos = new Vector4d(pos.x, pos.y, pos.z, pos.t);
  this.prevPos = new Vector4d(pos.x, pos.y, pos.z, pos.t);
  this.force = new Vector4d();
  this.velocity = new Vector4d();
  this.mass = 1;
}

Body4d.prototype.setPosition = function (x, y, z, t) {
  this.prevPos.x = this.pos.x = x;
  this.prevPos.y = this.pos.y = y;
  this.prevPos.z = this.pos.z = z;
  this.prevPos.t = this.pos.t = t;
};

function Vector4d(x, y, z, t) {
  if (x && typeof x !== 'number') {
    // could be another vector
    this.x = typeof x.x === 'number' ? x.x : 0;
    this.y = typeof x.y === 'number' ? x.y : 0;
    this.z = typeof x.z === 'number' ? x.z : 0;
    this.t = typeof x.t === 'number' ? x.t : 0;
  } else {
    this.x = typeof x === 'number' ? x : 0;
    this.y = typeof y === 'number' ? y : 0;
    this.z = typeof z === 'number' ? z : 0;
    this.t = typeof t === 'number' ? t : 0;
  }
}

Vector4d.prototype.reset = function () {
  this.x = this.y = this.z = this.t = 0;
};
