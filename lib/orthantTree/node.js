/**
 * Internal data structure to represent 4D tree node
 */
var Vector = require('../vector.js');

module.exports = OrthNode;

function OrthNode(dim) {
  // body stored inside this node. In quad tree only leaf nodes
  // contain boides (by construction):
  this.body = null;

  // Initialize quads (orthtants):
  this.orthants = Math.pow(2, dim);
  for (var i = 0; i < this.orthants; ++i) this[i] = null;

  // Total mass of current node
  this.mass = 0;

  // Center of mass coordinates
  this.massVector = new Vector(dim);

  // bounding box coordinates
  this.left = new Vector(dim);
  this.right = new Vector(dim);
}

OrthNode.prototype.reset = function () {
  for (var i = 0; i < this.orthants; ++i) this[i] = null;
  this.mass = 0;
  this.massVector.reset();
  this.left.reset();
  this.right.reset();
};
