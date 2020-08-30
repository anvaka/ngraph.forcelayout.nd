let test = require('tap').test;
let createGraph = require('ngraph.graph');
let createLayout = require('../');

test('layout initializes nodes positions', function (t) {
  var graph = createGraph();
  graph.addLink(1, 2);

  var layout = createLayout(graph, {
    dimension: 4
  });

  // perform one iteration of layout:
  layout.step();

  graph.forEachNode(function (node) {
    var pos = layout.getNodePosition(node.id);
    t.ok(pos.length === 4);
    for (let i = 0; i  < pos.length; ++i) {
      let v = pos[i];
      t.ok(Number.isFinite(v), 'Position is defined');
    }
});

  graph.forEachLink(function (link) {
    var linkPos = layout.getLinkPosition(link.id);
    t.ok(linkPos && linkPos.from && linkPos.to, 'Link position is defined');
    var fromPos = layout.getNodePosition(link.fromId);
    t.ok(linkPos.from === fromPos, '"From" should be identical to getNodePosition');
    var toPos = layout.getNodePosition(link.toId);
    t.ok(linkPos.to === toPos, '"To" should be identical to getNodePosition');
  });

  t.end();
});