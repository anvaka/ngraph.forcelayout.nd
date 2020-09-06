var graph = require('ngraph.generators').grid(20, 20);
var trueForceLayout = require('ngraph.forcelayout');
var iterationsPerRun = 20;
var createNDLayout = require('../');

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

// add tests
suite
.add('Real 2d layout', createNewForceLayoutPerfTest(2))
.add('Real 3d layout', createNewForceLayoutPerfTest(3))
.add('Real 4d layout', createNewForceLayoutPerfTest(4))
.add('Run 2d layout', createLayoutPerfTest(2))
.add('Run 3d layout', createLayoutPerfTest(3))
.add('Run 4d layout', createLayoutPerfTest(4))
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });

function createLayoutPerfTest(dimension) {
  return function () {
    var layout = createNDLayout(graph, {
      dimension: dimension
    });
    for (var i = 0; i < iterationsPerRun; ++i) {
      layout.step();
    }
  };
}

function createNewForceLayoutPerfTest(dimensions) {
  return function() {
    var layout = trueForceLayout(graph, {dimensions: dimensions});
    for (var i = 0; i < iterationsPerRun; ++i) {
      layout.step();
    }
  }
}