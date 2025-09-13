const suma = require('./prueba');

test('Suma 1 + 2 es igual a 3', () => {
  expect(suma(1, 2)).toBe(3);
});

test('Suma 0 + 0 es igual a 0', () => {
  expect(suma(0, 0)).toBe(0);
});

test('Suma -2 + 5 es igual a 3', () => {
  expect(suma(-2, 5)).toBe(3);
});
