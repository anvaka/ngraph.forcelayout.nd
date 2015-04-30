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
});

```
# install

With [npm](https://npmjs.org) do:

```
npm install ngraph.forcelayout4d
```

# license

MIT
