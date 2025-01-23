// Example of a JavaScript code that violates SonarQube rules

// Rule: Variables should not be declared without 'var', 'let', or 'const'
x = 10;

// Rule: Functions should not have too many parameters
function exampleFunction(param1, param2, param3, param4, param5, param6) {
  return param1 + param2 + param3 + param4 + param5 + param6;
}

// Rule: Functions should not be too complex
function complexFunction(a, b) {
  if (a > b) {
    if (a > 10) {
      if (b < 5) {
        return a + b;
      } else {
        return a - b;
      }
    } else {
      return a * b;
    }
  } else {
    return b - a;
  }
}

// Rule: Lines should not be too long
var longString =
  "This is a very long string that exceeds the maximum line length that is typically allowed by SonarQube rules for better readability and maintainability of the code.";

console.log(x);
console.log(exampleFunction(1, 2, 3, 4, 5, 6));
console.log(complexFunction(15, 3));
console.log(longString);
