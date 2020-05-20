const tests = require('../server/validation-tests');

describe('.isValidNum()', () => {
  test('Returns true if number is a positive integer', () => {
    expect(tests.isValidNum('2')).toBe(true);
  });
  test('Returns false if number is not a positive integer', () => {
    expect(tests.isValidNum('-1')).toBe(false);
    expect(tests.isValidNum('two')).toBe(false);
    expect(tests.isValidNum('0')).toBe(false);
    expect(tests.isValidNum('')).toBe(false);
    expect(tests.isValidNum(null)).toBe(false);
    expect(tests.isValidNum(undefined)).toBe(false);
  });
});

describe('.isValidName()', () => {
  test('Returns true if name only consists of 5-67 letters/spaces', () => {
    expect(tests.isValidName('John Doe')).toBe(true);
  });
  test('Returns false if name is less than 5 characters', () => {
    expect(tests.isValidName('John')).toBe(false);
  });
  test('Returns false if name is more than 67 characters', () => {
    expect(tests.isValidName('foo'.repeat(30))).toBe(false);
  });
  test('Returns false if name includes numbers', () => {
    expect(tests.isValidName('John Do3')).toBe(false);
  });
  test('Returns false if name includes symbols', () => {
    expect(tests.isValidName('J@hn Doe$')).toBe(false);
  });
  test('Returns false if name includes consecutive spaces', () => {
    expect(tests.isValidName('John  Doe')).toBe(false);
  });
  test('Returns false if name is an empty string', () => {
    expect(tests.isValidName('')).toBe(false);
  });
  test('Returns false if name is undefined', () => {
    expect(tests.isValidName(undefined)).toBe(false);
  });
});
