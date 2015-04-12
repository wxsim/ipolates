# ipolates

An interpolation library for scalar fields

## Features

### Linear Interpolation
```js

var ipolates = require('ipolates');
var value;

// Arguments passed in order (x1, y1, x2, y2, x)
value = ipolates.linear( 1, 2, 3, 4, 2.2);
// value = 3.2

// Arguments passed as a named-parameter object
value = ipolates.linear({ x1: 1, y1: 2, x2: 3, y2: 4, x: 2.2});
// value = 3.2
```

### Bilinear Interpolation
```js

var ipolates = require('ipolates');
var value;

// Arguments passed in order (x1, y1, x2, y2, x, y, q0_0, q1_0, q0_1, q1_1)
value = ipolates.bilinear( 1, 2, 3, 4, 2.2, 3.3, 5, 6, 7, 8 );
// value = 6.9

// Arguments passed as a named-parameter object
value = ipolates.bilinear({ x0: 1, y0: 2, x1: 3, y1: 4, x: 2.2, y:3.3,
  q0_0: 5, q1_0: 6, q0_1: 7, q1_1: 8
});
// value = 6.9
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
