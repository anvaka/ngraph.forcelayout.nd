/**
 * N-dimensional force based graph layout
 */
module.exports = createLayout;
createLayout.get2dLayout = require('ngraph.forcelayout');

function createLayout(graph, physicsSettings) {
  var merge = require('ngraph.merge');
  physicsSettings = merge(physicsSettings, {
    dimension: 2,
    createQuadTree: require('./lib/orthantTree/index.js'),
    createBounds: require('./lib/bounds'),
    createDragForce: require('./lib/dragForce'),
    createSpringForce: require('./lib/springForce'),
    integrator: require('./lib/eulerIntegrator'),
    createBody: require('./lib/createBody')
  });

  return createLayout.get2dLayout(graph, physicsSettings);
}
