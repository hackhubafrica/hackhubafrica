// Load Math.js library
const math = require('mathjs');

// Define the coefficients and function f(x)
const a2 = (x) => math.pow(x, 2); // a2(x) = x^2
const a1 = (x) => 3 * x;          // a1(x) = 3x
const a0 = 2;                     // a0(x) = 2
const f = (x) => math.sin(x);      // f(x) = sin(x)

// Define y(x) as a known function for this example
const y = (x) => math.pow(x, 2);   // Let's assume y(x) = x^2

// First and second derivatives of y(x)
const dy = math.derivative('x^2', 'x');     // First derivative of y(x)
const d2y = math.derivative(dy.toString(), 'x');  // Second derivative of y(x)

// Let's compute the value of the equation at a specific point, say x = 1
const x_val = 1;

// Compute the equation at x = 1
const equation = math.add(
    math.multiply(a2(x_val), d2y.evaluate({x: x_val})),  // x^2 * d^2y/dx^2
    math.multiply(a1(x_val), dy.evaluate({x: x_val})),   // 3x * dy/dx
    math.multiply(a0, y(x_val))                         // 2 * y(x)
);

// Compare the result with f(x)
const result = math.equal(equation, f(x_val));

// Output the result
console.log("Equation result at x =", x_val, ":", equation);
console.log("f(x) at x =", x_val, ":", f(x_val));
console.log("Does equation equal f(x)?", result);
