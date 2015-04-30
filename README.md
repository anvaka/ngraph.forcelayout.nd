# ngraph.forcelayoutNd

Experimental N-dimensional force based graph layout. It supports graph layout
in multidimensional spaces (2+), using higher dimensional orthant trees (similar
to quadtrees, but generalized to multidimensional spaces).

# usage

``` js
// let's say you have a graph instance:
var graph = require('ngraph.graph')();
graph.addLink(1, 2);

var createLayout = require('ngraph.forcelayout.nd');
// to create 2d layout:
var layout2d = createLayout(graph, {
  dimension: 2
});

// to create 4d layout:
var layout4d = createLayout(graph, {
  dimension: 4
});

// Once you have layout, call it iteratively:
layout2d.step();

// You can then get positions of each node:
graph.forEachNode(printPosition);

function printPosition(node) {
  var pos = layout2d.getNodePosition(node.id);
  // pos[0], pos[1] - will represent x, y coordinates of a node.
}

```

# install

With [npm](https://npmjs.org) do:

```
npm install ngraph.forcelayout4d
```

# license

MIT
