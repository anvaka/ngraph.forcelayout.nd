/**
 * Performs forces integration, using given timestep. Uses Euler method to solve
 * differential equation (http://en.wikipedia.org/wiki/Euler_method ).
 *
 * @returns {Number} squared distance of total position updates.
 */

module.exports = integrate;

function integrate(bodies, timeStep) {
  var totalMove = 0;
  for (var i = 0; i < bodies.length; ++i) {
    var body = bodies[i];
    var coeff = timeStep / body.mass;

    body.velocity.moveByScale(coeff, body.force);
    body.velocity.normalize();
    totalMove += body.pos.moveByScaleAndReturnChange(timeStep, body.velocity);
  }

  return totalMove/bodies.length;
}
