var graph = require('ngraph.generators').grid(20, 20);
var iterationsPerRun = 20;

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

// add tests
suite.add('Run 2d layout', createLayoutPerfTest(2))
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
    var layout = require('../')(graph, {
      dimension: dimension
    });
    for (var i = 0; i < iterationsPerRun; ++i) {
      layout.step();
    }
  };
}
