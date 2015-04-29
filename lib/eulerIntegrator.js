/**
 * Performs 4d forces integration, using given timestep. Uses Euler method to solve
 * differential equation (http://en.wikipedia.org/wiki/Euler_method ).
 *
 * @returns {Number} squared distance of total position updates.
 */

module.exports = integrate;

function integrate(bodies, timeStep) {
  var dx = 0, tx = 0,
      dy = 0, ty = 0,
      dz = 0, tz = 0,
      dt = 0, tt = 0,
      i,
      max = bodies.length;

  for (i = 0; i < max; ++i) {
    var body = bodies[i],
        coeff = timeStep / body.mass;

    body.velocity.x += coeff * body.force.x;
    body.velocity.y += coeff * body.force.y;
    body.velocity.z += coeff * body.force.z;
    body.velocity.t += coeff * body.force.t;

    var vx = body.velocity.x,
        vy = body.velocity.y,
        vz = body.velocity.z,
        vt = body.velocity.t,
        v = Math.sqrt(vx * vx + vy * vy + vz * vz + vt * vt);

    if (v > 1) {
      body.velocity.x = vx / v;
      body.velocity.y = vy / v;
      body.velocity.z = vz / v;
      body.velocity.t = vt / v;
    }

    dx = timeStep * body.velocity.x;
    dy = timeStep * body.velocity.y;
    dz = timeStep * body.velocity.z;
    dt = timeStep * body.velocity.t;

    body.pos.x += dx;
    body.pos.y += dy;
    body.pos.z += dz;
    body.pos.t += dt;

    tx += Math.abs(dx);
    ty += Math.abs(dy);
    tz += Math.abs(dz);
    tt += Math.abs(dt);
  }

  return (tx * tx + ty * ty + tz * tz + tt * tt)/bodies.length;
}
