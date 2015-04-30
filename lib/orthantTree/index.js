/**
 * This is Barnes Hut simulation algorithm, generalized for n-dimensional case.
 *
 * http://www.cs.princeton.edu/courses/archive/fall03/cs126/assignments/barnes-hut.html
 */
var Vector = require('../vector.js');

module.exports = function(options) {
  options = options || {};
  options.gravity = typeof options.gravity === 'number' ? options.gravity : -1;
  options.theta = typeof options.theta === 'number' ? options.theta : 0.8;

  // we require deterministic randomness here
  var random = require('ngraph.random').random(1984),
    InsertStack = require('./insertStack.js'),
    isSamePosition = require('./isSamePosition.js');

  var gravity = options.gravity,
    dim = options.dimension,
    updateQueue = [],
    insertStack = new InsertStack(),
    theta = options.theta,
    newNode = require('./nodeFactory.js')(dim),

    root = newNode(),
    tempLeft = new Vector(dim),
    tempRight = new Vector(dim),

    // Inserts body to the tree
    insert = function(newBody) {
      insertStack.reset();
      insertStack.push(root, newBody);

      while (!insertStack.isEmpty()) {
        var stackItem = insertStack.pop(),
          node = stackItem.node,
          body = stackItem.body;

        if (!node.body) {
          // This is internal node. Update the total mass of the node and center-of-mass.
          var pos = body.pos;
          node.mass += body.mass;
          node.massVector.moveByScale(body.mass, pos);

          // Recursively insert the body in the appropriate orthant.
          // But first find the appropriate quadrant.
          tempLeft.assign(node.left);
          tempRight.assignMedian(node.right, node.left);

          var quadIdx = 0; // Assume we are in the 0's quad.
          for (var i = 0; i < pos.length; ++i) {
            if (pos[i] > tempRight[i]) {
              quadIdx += Math.pow(2, i);
              var oldLeft = tempLeft[i];
              tempLeft[i] = tempRight[i];
              tempRight[i] = tempRight[i] + (tempRight[i] - oldLeft);
            }
          }

          var child = node[quadIdx];
          if (!child) {
            // The node is internal but this quadrant is not taken. Add subnode to it.
            child = newNode();
            child.left.assign(tempLeft);
            child.right.assign(tempRight);
            child.body = body;

            node[quadIdx] = child;
          } else {
            // continue searching in this quadrant.
            insertStack.push(child, body);
          }
        } else {
          // We are trying to add to the leaf node.
          // We have to convert current leaf into internal node
          // and continue adding two nodes.
          var oldBody = node.body;
          node.body = null; // internal nodes do not carry bodies

          if (isSamePosition(oldBody.pos, body.pos)) {
            // Next layout iteration should get larger bounding box in the first step and fix this
            return;
          }
          // Next iteration should subdivide node further.
          insertStack.push(node, oldBody);
          insertStack.push(node, body);
        }
      }
    },

    update = function(sourceBody) {
      var queue = updateQueue,
        v, r, i,
        force = new Vector(dim),
        queueLength = 1,
        shiftIdx = 0,
        pushIdx = 1;

      queue[0] = root;

      while (queueLength) {
        var node = queue[shiftIdx],
          body = node.body;

        queueLength -= 1;
        shiftIdx += 1;
        var differentBody = (body !== sourceBody);
        if (body && differentBody) {
          // If the current node is a leaf node (and it is not source body),
          // calculate the force exerted by the current node on body, and add this
          // amount to body's net force.
          tempLeft.assignSub(body.pos, sourceBody.pos);
          r = tempLeft.norm();

          if (r === 0) {
            // Poor man's protection against zero distance.
            tempLeft.assignUniform((random.nextDouble() - 0.5) / 50);
            r = tempLeft.norm();
          }

          // This is standard gravitation force calculation but we divide
          // by r^3 to save two operations when normalizing force vector.
          v = gravity * body.mass * sourceBody.mass / (r * r * r);
          force.moveByScale(v, tempLeft);
        } else if (differentBody) {
          // Otherwise, calculate the ratio s / r,  where s is the width of the region
          // represented by the internal node, and r is the distance between the body
          // and the node's center-of-mass
          tempLeft.assignWeightedDiff(node.massVector, node.mass, sourceBody.pos);
          r = tempLeft.norm();

          if (r === 0) {
            tempLeft.assignUniform((random.nextDouble() - 0.5) / 50);
            r = tempLeft.norm();
          }

          // If s / r < θ, treat this internal node as a single body, and calculate the
          // force it exerts on sourceBody, and add this amount to sourceBody's net force.
          if ((node.right[0] - node.left[0]) / r < theta) {
            // in the if statement above we consider node's width only
            // because the region was squarified during tree creation.
            // Thus there is no difference between using width or height.
            v = gravity * node.mass * sourceBody.mass / (r * r * r);
            force.moveByScale(v, tempLeft);
          } else {
            // Otherwise, run the procedure recursively on each of the current node's children.
            for (i = 0; i < node.orthants; ++i) {
              if (node[i]) {
                queue[pushIdx] = node[i];
                queueLength += 1;
                pushIdx += 1;
              }
            }
          }
        }
      }
      sourceBody.force.add(force);
    },

    insertBodies = function(bodies) {
      tempLeft.assignUniform(Number.POSITIVE_INFINITY);
      tempRight.assignUniform(Number.NEGATIVE_INFINITY);
      var i, max = bodies.length;

      // To reduce orthant tree depth we are looking for exact bounding box of all particles.
      i = max;
      var maxSide = 0;
      while (i--) {
        var pos = bodies[i].pos;
        for (var j = 0; j < pos.length ; j++) {
          if (pos[j] < tempLeft[j]) tempLeft[j] = pos[j];
          if (pos[j] > tempRight[j]) tempRight[j] = pos[j];
          var sideLength = tempRight[j] - tempLeft[j];
          if (sideLength > maxSide) maxSide = sideLength;
        }
      }

      newNode.reset();

      root = newNode();
      root.left.assign(tempLeft);
      root.right.assignUniformAdd(tempLeft, maxSide);

      i = max - 1;
      if (i > 0) {
        root.body = bodies[i];
      }
      while (i--) {
        insert(bodies[i], root);
      }
    };

  return {
    insertBodies: insertBodies,
    updateBodyForce: update,
    options: function(newOptions) {
      if (newOptions) {
        if (typeof newOptions.gravity === 'number') {
          gravity = newOptions.gravity;
        }
        if (typeof newOptions.theta === 'number') {
          theta = newOptions.theta;
        }

        return this;
      }

      return {
        gravity: gravity,
        theta: theta
      };
    }
  };
};
