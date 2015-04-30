module.exports = Vector;

function Vector(pos) {
  var i;
  if (typeof pos === 'number') {
    for (i = 0; i < pos; ++i) {
      this[i] = 0;
    }
    this.length = pos;
  } else {
    for (i = 0; i < pos.length; ++i) {
      this[i] = pos[i];
    }
    this.length = pos.length;
  }
}

Vector.sub = function(a, b) {
  var result = new Vector(a.length);
  for (var i = 0; i < a.length; ++i) {
    result[i] = a[i] - b[i];
  }
  return result;
};

Vector.add = function(a, b) {
  var result = new Vector(a.length);
  for (var i = 0; i < a.length; ++i) {
    result[i] = a[i] + b[i];
  }
  return result;
};

Vector.uniform = function(dim, initialValue) {
  var result = new Vector(dim);
  for (var i = 0; i < dim; ++i) {
    result[i] = initialValue;
  }
  return result;
};

Vector.prototype.reset = function () {
  for (var i = 0; i < this.length; ++i) {
    this[i] = 0;
  }
};

Vector.prototype.moveByScale = function (scale, direction) {
  for (var i = 0; i < this.length; ++i) {
    this[i] += scale * direction[i];
  }
};

Vector.prototype.moveByScaleAndReturnChange = function (scale, direction) {
  var change = 0;
  for (var i = 0; i < this.length; ++i) {
    var x = scale * direction[i];
    this[i] += x;
    change += Math.abs(x);
  }
  return change;
};

Vector.prototype.normalize = function () {
  var norm = this.norm();
  if (norm > 1) {
    for (var i = 0; i < this.length; ++i) {
      this[i] /= norm;
    }
  }
};

Vector.prototype.norm = function() {
  var sum = 0;
  for (var i = 0; i < this.length; ++i) {
    sum += this[i] * this[i];
  }

  return Math.sqrt(sum);
};

Vector.prototype.add = function (other) {
  for (var i = 0; i < this.length; ++i) {
    this[i] += other[i];
  }
};

Vector.prototype.divScalar = function(scalar) {
  for (var i = 0; i < this.length; ++i) {
    this[i] /= scalar;
  }
};

Vector.prototype.addScalar = function(scalar) {
  for (var i = 0; i < this.length; ++i) {
    this[i] += scalar;
  }
};

Vector.prototype.assign = function(other) {
  for (var i = 0; i < this.length; ++i) {
    this[i] = other[i];
  }
};

Vector.prototype.assignUniform = function(other) {
  for (var i = 0; i < this.length; ++i) {
    this[i] = other;
  }
};

Vector.prototype.assignUniformAdd = function(other, uniform) {
  for (var i = 0; i < this.length; ++i) {
    this[i] = other[i] + uniform;
  }
};

Vector.prototype.assignMedian = function(a, b) {
  for (var i = 0; i < this.length; ++i) {
    this[i] = (a[i] + b[i])/2;
  }
};

Vector.prototype.assignSub = function (a, b) {
  for (var i = 0; i < this.length; ++i) {
    this[i] = a[i] - b[i];
  }
};

Vector.prototype.assignWeightedDiff = function(a, weight, b) {
  for (var i = 0; i < this.length; ++i) {
    this[i] = a[i]/weight - b[i];
  }
};
