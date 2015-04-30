var Vector = require('./vector.js');

module.exports = bounds;

function bounds(bodies, settings) {
  var random = require('ngraph.random').random(42);
  var dim = settings.dimension;
  var boundingBox =  {
    left: new Vector(dim),
    right: new Vector(dim)
  };

  return {
    box: boundingBox,

    update: updateBoundingBox,

    reset : function () {
      boundingBox.left.reset();
      boundingBox.right.reset();
    },

    getBestNewPosition: function (neighbors) {
      var graphRect = boundingBox;
      var i;

      var base = new Vector(dim);

      if (neighbors.length) {
        for (i = 0; i < neighbors.length; ++i) {
          base.add(neighbors[i].pos);
        }
        base.divScalar(neighbors.length);
      } else {
        base = Vector.add(graphRect.left, graphRect.right);
        base.divScalar(2);
      }

      var springLength = settings.springLength;
      for (i = 0; i < dim; ++i) {
        base[i] += random.next(springLength) - springLength / 2;
      }
      return base;
    }
  };

  function updateBoundingBox() {
    var i = bodies.length;
    if (i === 0) { return; } // don't have to wory here.

    var left = new Vector(dim);
    var right = new Vector(dim);
    left.addScalar(Number.POSITIVE_INFINITY);
    right.addScalar(Number.NEGATIVE_INFINITY);

    while(i--) {
      // this is O(n), could it be done faster with quadtree?
      // how about pinned nodes?
      var body = bodies[i];
      if (body.isPinned) {
        body.pos.assign(body.prevPos);
      } else {
        body.prevPos.assign(body.pos);
      }
      var pos = body.pos;
      for (var j = 0; j < pos.length; ++j) {
        if (pos[j] < left[j]) left[j] = pos[j];
        if (pos[j] > right[j]) right[j] = pos[j];
      }
    }
    boundingBox.left.assign(left);
    boundingBox.right.assign(right);
  }
}
