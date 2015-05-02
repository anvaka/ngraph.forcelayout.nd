var test = require('tap').test,
    createBody = require('../lib/createBody.js'),
    bounds = require('../lib/bounds.js');

test('update bounding box', function (t) {
  var bodies = [];
  var b = bounds(bodies, {dimension: 3});
  b.update();

  // empty bodies, but box should exist:
  var box = b.box;
  t.ok(isVector(box.left), 'Box has "left" bound');
  t.ok(isVector(box.right), 'Box has "right" bound');

  bodies.push(createBody([0, 0, 0]));
  bodies.push(createBody([1, 1, 1]));

  b.update();
  // now two bodies, and box should be 0, 0, 0 > 1, 1, 1
  t.equals(box.left[0], 0); t.equals(box.left[1], 0); t.equals(box.left[2], 0);
  t.equals(box.right[0], 1); t.equals(box.right[1], 1); t.equals(box.right[2], 1);

  t.end();
});

function isVector(x) {
  return x && typeof x.length === 'number';
}
