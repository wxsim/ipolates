var assert = require('assert'),
    sinon = require('sinon'),
    bilinear = require('../lib').bilinear;

describe('Bilinear Interpolation', function() {

  it('should throw an error when it receives the wrong number of arguments', function() {
    assert.throws(function() { bilinear(); }
    , /Wrong number of arguments/);
    assert.throws(function() { bilinear(1, 1); }
    , /Wrong number of arguments/);
    assert.throws(function() { bilinear(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1); }
    , /Wrong number of arguments/);
  });

  it('should throw an error when a named-parameter object is missing any parameters', function() {
    assert.throws(function() { bilinear({y0: 0, x1: 1, y1: 1, x: 0.5, y: 0.5, q0_0: 1, q1_0: 1, q0_1: 1, q1_1: 1}); }
    , /Missing named parameters/);
    assert.throws(function() { bilinear({x0: 0, x1: 1, y1: 1, x: 0.5, y: 0.5, q0_0: 1, q1_0: 1, q0_1: 1, q1_1: 1}); }
    , /Missing named parameters/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, y1: 1, x: 0.5, y: 0.5, q0_0: 1, q1_0: 1, q0_1: 1, q1_1: 1}); }
    , /Missing named parameters/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, x: 0.5, y: 0.5, q0_0: 1, q1_0: 1, q0_1: 1, q1_1: 1}); }
    , /Missing named parameters/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, y1: 1, y: 0.5, q0_0: 1, q1_0: 1, q0_1: 1, q1_1: 1}); }
    , /Missing named parameters/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: 0.5, q0_0: 1, q1_0: 1, q0_1: 1, q1_1: 1}); }
    , /Missing named parameters/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: 0.5, y: 0.5, q1_0: 1, q0_1: 1, q1_1: 1}); }
    , /Missing named parameters/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: 0.5, y: 0.5, q0_0: 1,  q0_1: 1, q1_1: 1}); }
    , /Missing named parameters/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: 0.5, y: 0.5, q0_0: 1, q1_0: 1, q1_1: 1}); }
    , /Missing named parameters/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: 0.5, y: 0.5, q0_0: 1, q1_0: 1, q0_1: 1}); }
    , /Missing named parameters/);

  });

  it('should throw an error when there is one argument and it\'s not a named parameter object', function() {
    assert.throws(function() { bilinear(1); }
    , /Wrong number of arguments/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: 0.5, y: 0.5, q0_0: 1, q1_0: 1, q0_1: 1, q1_1: 1}, 1); }
    , /Wrong number of arguments/);
  });

  it('should throw an error when the interpolant is out of bounds', function() {
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: -1, y: 0.5, q0_0: 1, q1_0: 1, q0_1: 1, q1_1: 1}); }
    , /Interpolant out of bounds/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: 2, y: 0.5, q0_0: 1, q1_0: 1, q0_1: 1, q1_1: 1}); }
    , /Interpolant out of bounds/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: 0.5, y: -1, q0_0: 1, q1_0: 1, q0_1: 1, q1_1: 1}); }
    , /Interpolant out of bounds/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: 0.5, y: 2, q0_0: 1, q1_0: 1, q0_1: 1, q1_1: 1}); }
    , /Interpolant out of bounds/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: -1, y: -1, q0_0: 1, q1_0: 1, q0_1: 1, q1_1: 1}); }
    , /Interpolant out of bounds/);
    assert.throws(function() { bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: 2, y: 2, q0_0: 1, q1_0: 1, q0_1: 1, q1_1: 1}); }
    , /Interpolant out of bounds/);
  });

  it('should bilinearly interpolate an argument list of x0, y0, x1, y1, x, y, q0_0, q1_0, q0_1, q1_1', function() {
    assert.equal(bilinear(0, 0, 1, 1, 0.5, 0.5, 1, 2, 3, 4), 2.5);
    assert.equal(bilinear(-1, -1, 1, 2, 0.5, 0.5, 1, 2, 3, 4), 2.75);
    assert.equal(bilinear(1, 1, 0, 0, 0.5, 0.5, 1, 2, 3, 4), 2.5);
    assert.equal(bilinear(1, 2, -1, -1, 0.5, 0.5, 1, 2, 3, 4), 2.25);
    assert.equal(bilinear(0, 0, 1, 1, 0, 0.5, 1, 2, 3, 4), 2);
    assert.equal(bilinear(0, 0, 1, 1, 0.5, 1, 1, 2, 3, 4), 3.5);
  });

  it('should bilinearly interpolate a named-parameter list of x0, y0, x1, y1, x, y, q0_0, q1_0, q0_1, q1_1', function() {
    assert.equal(bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: 0.5, y: 0.5, q0_0: 1, q1_0: 2, q0_1: 3, q1_1: 4}), 2.5);
    assert.equal(bilinear({x0: -1, y0: -1, x1: 1, y1: 2, x: 0.5, y: 0.5, q0_0: 1, q1_0: 2, q0_1: 3, q1_1: 4}), 2.75);
    assert.equal(bilinear({x0: 1, y0: 1, x1: 0, y1: 0, x: 0.5, y: 0.5, q0_0: 1, q1_0: 2, q0_1: 3, q1_1: 4}), 2.5);
    assert.equal(bilinear({x0: 1, y0: 2, x1: -1, y1: -1, x: 0.5, y: 0.5, q0_0: 1, q1_0: 2, q0_1: 3, q1_1: 4}), 2.25);
    assert.equal(bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: 0, y: 0.5, q0_0: 1, q1_0: 2, q0_1: 3, q1_1: 4}), 2);
    assert.equal(bilinear({x0: 0, y0: 0, x1: 1, y1: 1, x: 0.5, y: 1, q0_0: 1, q1_0: 2, q0_1: 3, q1_1: 4}), 3.5);
  });

});
