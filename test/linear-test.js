var assert = require('assert'),
    sinon = require('sinon'),
    linear = require('../lib').linear;

describe('Linear Interpolation', function() {

  it('should throw an error when it receives the wrong number of arguments', function() {
    assert.throws(function() { linear(); }
    , /Wrong number of arguments/);
    assert.throws(function() { linear(1, 1); }
    , /Wrong number of arguments/);
    assert.throws(function() { linear(1, 1, 1, 1, 1, 1); }
    , /Wrong number of arguments/);
  });

  it('should throw an error when a named-parameter object is missing any parameters', function() {
    assert.throws(function() { linear({y0: 0, x1: 1, y1: 1, x: 0.5}); }
    , /Missing named parameters/);
    assert.throws(function() { linear({x0: 0, x1: 1, y1: 1, x: 0.5}); }
    , /Missing named parameters/);
    assert.throws(function() { linear({x0: 0, y0: 0, y1: 1, x: 0.5}); }
    , /Missing named parameters/);
    assert.throws(function() { linear({x0: 0, y0: 0, x1: 1, x: 0.5}); }
    , /Missing named parameters/);
    assert.throws(function() { linear({x0: 0, y0: 0, x1: 1, y1: 1}); }
    , /Missing named parameters/);
  });

  it('should throw an error when there is one argument and it\'s not a named parameter object', function() {
    assert.throws(function() { linear(1); }
    , /Wrong number of arguments/);
    assert.throws(function() { linear({x0: 0, y0: 0, x1: 1, y1: 1, x: 0.5}, 1); }
    , /Wrong number of arguments/);
  });

  it('should throw an error when the interpolant is out of bounds', function() {
    assert.throws(function() { linear({x0: 0, y0: 0, x1: 1, y1: 1, x: -1}); }
    , /Interpolant out of bounds/);
    assert.throws(function() { linear({x0: 0, y0: 0, x1: 1, y1: 1, x: 2}); }
    , /Interpolant out of bounds/);
    assert.throws(function() { linear({x0: 1, y0: 1, x1: 0, y1: 0, x: -1}); }
    , /Interpolant out of bounds/);
    assert.throws(function() { linear({x0: 1, y0: 1, x1: 0, y1: 0, x: 2}); }
    , /Interpolant out of bounds/);
  });

  it('should linearly interpolate an argument list of x0, y0, x1, y1, x', function() {
    assert.equal(linear(0, 0, 1, 1, 0.5), 0.5);
    assert.equal(linear(0, 0, 1, 2, 0.5), 1);
    assert.equal(linear(-1, -1, 1, 2, 0.5), 1.25);
    assert.equal(linear(1, 1, 0, 0, 0.5), 0.5);
    assert.equal(linear(1, 2, 0, 0, 0.5), 1);
    assert.equal(linear(1, 2, -1, -1, 0.5), 1.25);
    assert.equal(linear(-3, -3, 2, 2, 2), 2);
    assert.equal(linear(-3, -3, 2, 2, -3), -3);
  });

  it('should linearly interpolate a named-parameter list of x0, y0, x1, y1, x', function() {
    assert.equal(linear({x0: 0, y0: 0, x1: 1, y1: 1, x: 0.5}), 0.5);
    assert.equal(linear({x0: 0, y0: 0, x1: 1, y1: 2, x: 0.5}), 1);
    assert.equal(linear({x0: -1, y0: -1, x1: 1, y1: 2, x: 0.5}), 1.25);
    assert.equal(linear({x0: 1, y0: 1, x1: 0, y1: 0, x: 0.5}), 0.5);
    assert.equal(linear({x0: 1, y0: 2, x1: 0, y1: 0, x: 0.5}), 1);
    assert.equal(linear({x0: 1, y0: 2, x1: -1, y1: -1, x: 0.5}), 1.25);
    assert.equal(linear({x0: -3, y0: -3, x1: 2, y1: 2, x: 2}), 2);
    assert.equal(linear({x0: -3, y0: -3, x1: 2, y1: 2, x: -3}), -3);
  });

});
