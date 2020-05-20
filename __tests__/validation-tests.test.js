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

describe('.isValidAddressOne()', () => {
  test('Returns true if addressOne only consists of 6-42 alphanumeric chars/spaces/symbols (.,#)', () => {
    expect(tests.isValidAddressOne('123 Front Street')).toBe(true);
  });
  test('Returns false if addressOne is less than 6 characters', () => {
    expect(tests.isValidAddressOne('Park')).toBe(false);
  });
  test('Returns false if addressOne is more than 42 characters', () => {
    expect(tests.isValidAddressOne('foo'.repeat(30))).toBe(false);
  });
  test('Returns false if addressOne includes symbols (except .,#)', () => {
    expect(tests.isValidAddressOne('123 Fr@nt Street!')).toBe(false);
  });
  test('Returns false if addressOne includes consecutive spaces', () => {
    expect(tests.isValidAddressOne('123 Front  Street')).toBe(false);
  });
  test('Returns false if addressOne is an empty string', () => {
    expect(tests.isValidAddressOne('')).toBe(false);
  });
  test('Returns false if addressOne is undefined', () => {
    expect(tests.isValidAddressOne(undefined)).toBe(false);
  });
});

describe('.isValidAddressTwo()', () => {
  test('Returns true if addressTwo only consists of 0-42 alphanumeric chars/spaces/symbols (.,#)', () => {
    expect(tests.isValidAddressTwo('123 Front Street')).toBe(true);
  });
  test('Returns true if addressTwo is undefined', () => {
    expect(tests.isValidAddressTwo(undefined)).toBe(true);
  });
  test('Returns true if addressTwo is an empty string', () => {
    expect(tests.isValidAddressTwo('')).toBe(true);
  });
  test('Returns false if addressTwo is more than 42 characters', () => {
    expect(tests.isValidAddressTwo('foo'.repeat(30))).toBe(false);
  });
  test('Returns false if addressTwo includes symbols (except .,#)', () => {
    expect(tests.isValidAddressTwo('123 Fr@nt Street!')).toBe(false);
  });
  test('Returns false if addressTwo includes consecutive spaces', () => {
    expect(tests.isValidAddressTwo('123 Front  Street')).toBe(false);
  });
});
