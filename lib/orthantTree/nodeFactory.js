var OrthNode = require('./node.js');

module.exports = createNodeFactory;

function createNodeFactory(dim) {
  var nodesCache = [];
  var currentInCache = 0;
  nodeFactory.reset = reset;

  return nodeFactory;

  function nodeFactory() {
    // To avoid pressure on GC we reuse nodes.
    var node = nodesCache[currentInCache];
    if (node) {
      node.reset();
    } else {
      node = new OrthNode(dim);
      nodesCache[currentInCache] = node;
    }

    ++currentInCache;
    return node;
  }

  function reset() {
    currentInCache = 0;
  }
}
