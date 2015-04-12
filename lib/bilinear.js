var R = require('ramda');
var linear = require('./linear');
var namedParameters = ['x0', 'y0', 'x1', 'y1', 'x', 'y', 'q0_0', 'q1_0', 'q0_1', 'q1_1'];

var bilinear = function() {
  if (arguments.length === 10) {
    return _bilinear.apply(null, arguments);
  } else if (arguments.length === 1 && typeof arguments[0] === "object") {
    var values = R.props(namedParameters, arguments[0]);
    if (!R.contains(undefined)(values)) {
      return _bilinear.apply(null, values);
    }else{
      var missing = R.intersection(namedParameters, R.difference(namedParameters, R.keys(arguments[0])));
      throw new Error("ArgumentsError: Missing named parameters in function `bilinear` (missing "+missing.join(', ')+")");
    }
  }
  throw new Error("ArgumentsError: Wrong number of arguments in function `bilinear` ("+arguments.length+" provided, 1 or 10 expected)");
}

var _bilinear = function(x0, y0, x1, y1, x, y, q0_0, q1_0, q0_1, q1_1) {
  var q0 = linear(y0, q0_0, y1, q0_1, y);
  var q1 = linear(y0, q1_0, y1, q1_1, y);
  return linear(x0, q0, x1, q1, x);
}

module.exports = bilinear;
