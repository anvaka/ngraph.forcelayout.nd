/**
 * Internal data structure to represent 4D tree node
 */
module.exports = function Node() {
  // body stored inside this node. In quad tree only leaf nodes (by construction)
  // contain boides:
  this.body = null;

  // Child nodes are stored in quads. Each quad is presented by number:
  // Behind Z median:
  // 0 | 1
  // -----
  // 2 | 3
  // In front of Z median:
  // 4 | 5
  // -----
  // 6 | 7
  // In past of T median:
  // 8 | 9
  // -----
  // 10|11
  // In the future of T median:
  // 12|13
  // -----
  // 14|15
  this.quad0 = null;
  this.quad1 = null;
  this.quad2 = null;
  this.quad3 = null;
  this.quad4 = null;
  this.quad5 = null;
  this.quad6 = null;
  this.quad7 = null;
  this.quad8 = null;
  this.quad9 = null;
  this.quad10 = null;
  this.quad11 = null;
  this.quad12 = null;
  this.quad13 = null;
  this.quad14 = null;
  this.quad15 = null;

  // Total mass of current node
  this.mass = 0;

  // Center of mass coordinates
  this.massX = 0;
  this.massY = 0;
  this.massZ = 0;
  this.massT = 0;

  // bounding box coordinates
  this.left = 0;
  this.top = 0;
  this.bottom = 0;
  this.right = 0;
  this.front = 0;
  this.back = 0;
  this.start = 0;
  this.end = 0;
};
