/**
 * Represents n-dimensional spring force, which updates forces acting on two
 * bodies, connected by a spring.
 *
 * @param {Object} options for the spring force
 * @param {Number=} options.springCoeff spring force coefficient.
 * @param {Number=} options.springLength desired length of a spring at rest.
 */
var Vector = require('./vector.js');

module.exports = function (options) {
  var merge = require('ngraph.merge');
  var random = require('ngraph.random').random(42);
  var expose = require('ngraph.expose');

  options = merge(options, {
    springCoeff: 0.0002,
    springLength: 80
  });

  var api = {
    /**
     * Updates forces acting on a spring
     */
    update : function (spring) {
      var body1 = spring.from,
          body2 = spring.to,
          length = spring.length < 0 ? options.springLength : spring.length,
          dist = Vector.sub(body2.pos, body1.pos),
          r = dist.norm();

      if (r === 0) {
        dist = Vector.uniform(body2.length, (random.nextDouble() - 0.5)/50);
        r = dist.norm();
      }

      var d = r - length;
      var coeff = ((!spring.coeff || spring.coeff < 0) ? options.springCoeff : spring.coeff) * d / r;

      body1.force.moveByScale(coeff, dist);
      body2.force.moveByScale(-coeff, dist);
    }
  };

  expose(options, api, ['springCoeff', 'springLength']);
  return api;
};
