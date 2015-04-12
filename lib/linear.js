var R = require('ramda');
var namedParameters = ['x0', 'y0', 'x1', 'y1', 'x'];

var linear = function() {
  if (arguments.length === 5) {
    return _validate.apply(null, arguments);
  } else if (arguments.length === 1 && typeof arguments[0] === "object") {
    var values = R.props(namedParameters, arguments[0]);
    if (!R.contains(undefined)(values)) {
      return _validate.apply(null, values);
    }else{
      var missing = R.intersection(namedParameters, R.difference(namedParameters, R.keys(arguments[0])));
      throw new Error("ArgumentsError: Missing named parameters in function `linear` (missing "+missing.join(', ')+")");
    }
  }
  throw new Error("ArgumentsError: Wrong number of arguments in function `linear` ("+arguments.length+" provided, 1 or 5 expected)");
}

var _validate = function(x0, y0, x1, y1, x) {
  if ((x < x1 && x < x0) || (x > x1 && x > x0)) {
    throw new Error("LogicError: Interpolant out of bounds");
  }
  return _linear(x0, y0, x1, y1, x);
}

var _linear = function(x0, y0, x1, y1, x) {
  return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}

module.exports = linear;
