const tests = require('../server/validation-tests');

describe('.isValidNum()', () => {
  describe('number is valid', () => {
    test('should return true if number is a positive integer', () => {
      expect(tests.isValidNum('2')).toBe(true);
    });
  });
  describe('number is invalid', () => {
    test('should return false if number is not a positive integer', () => {
      expect(tests.isValidNum('-1')).toBe(false);
      expect(tests.isValidNum('two')).toBe(false);
      expect(tests.isValidNum('0')).toBe(false);
      expect(tests.isValidNum('')).toBe(false);
      expect(tests.isValidNum(null)).toBe(false);
      expect(tests.isValidNum(undefined)).toBe(false);
    });
  });
});

describe('.isValidName()', () => {
  describe('name is valid', () => {
    test('should return true if name consists of 5-67 letters/spaces', () => {
      expect(tests.isValidName('John Doe')).toBe(true);
    });
  });
  describe('name is invalid', () => {
    test('should return false if name is less than 5 characters', () => {
      expect(tests.isValidName('John')).toBe(false);
    });
    test('should return false if name is more than 67 characters', () => {
      expect(tests.isValidName('foo'.repeat(30))).toBe(false);
    });
    test('should return false if name includes numbers', () => {
      expect(tests.isValidName('John Do3')).toBe(false);
    });
    test('should return false if name includes symbols', () => {
      expect(tests.isValidName('J@hn Doe$')).toBe(false);
    });
    test('should return false if name includes consecutive spaces', () => {
      expect(tests.isValidName('John  Doe')).toBe(false);
    });
    test('should return false if name begins with a space', () => {
      expect(tests.isValidName(' John Doe')).toBe(false);
    });
    test('should return false if name ends with a space', () => {
      expect(tests.isValidName('John Doe ')).toBe(false);
    });
    test('should return false if name is an empty string', () => {
      expect(tests.isValidName('')).toBe(false);
    });
    test('should return false if name is undefined', () => {
      expect(tests.isValidName(undefined)).toBe(false);
    });
  });
});

describe('.isValidAddressOne()', () => {
  describe('addressOne is valid', () => {
    test('should return true if addressOne consists of 6-42 alphanumeric chars/spaces/symbols (.,#)', () => {
      expect(tests.isValidAddressOne('123 Front Street')).toBe(true);
    });
  });
  describe('addressOne is invalid', () => {
    test('should return false if addressOne is less than 6 characters', () => {
      expect(tests.isValidAddressOne('Park')).toBe(false);
    });
    test('should return false if addressOne is more than 42 characters', () => {
      expect(tests.isValidAddressOne('foo'.repeat(30))).toBe(false);
    });
    test('should return false if addressOne includes symbols (except .,#)', () => {
      expect(tests.isValidAddressOne('123 Fr@nt Street!')).toBe(false);
    });
    test('should return false if addressOne includes consecutive spaces', () => {
      expect(tests.isValidAddressOne('123 Front  Street')).toBe(false);
    });
    test('should return false if addressOne begins with a space', () => {
      expect(tests.isValidAddressOne(' 123 Front Street')).toBe(false);
    });
    test('should return false if addressOne ends with a space', () => {
      expect(tests.isValidAddressOne('123 Front Street ')).toBe(false);
    });
    test('should return false if addressOne is an empty string', () => {
      expect(tests.isValidAddressOne('')).toBe(false);
    });
    test('should return false if addressOne is undefined', () => {
      expect(tests.isValidAddressOne(undefined)).toBe(false);
    });
  });
});

describe('.isValidAddressTwo()', () => {
  describe('addressTwo is valid', () => {
    test('should return true if addressTwo consists of 0-42 alphanumeric chars/spaces/symbols (.,#)', () => {
      expect(tests.isValidAddressTwo('123 Front Street')).toBe(true);
    });
    test('should return true if addressTwo is undefined', () => {
      expect(tests.isValidAddressTwo(undefined)).toBe(true);
    });
    test('should return true if addressTwo is an empty string', () => {
      expect(tests.isValidAddressTwo('')).toBe(true);
    });
  });
  describe('addressTwo is invalid', () => {
    test('should return false if addressTwo is more than 42 characters', () => {
      expect(tests.isValidAddressTwo('foo'.repeat(30))).toBe(false);
    });
    test('should return false if addressTwo includes symbols (except .,#)', () => {
      expect(tests.isValidAddressTwo('123 Fr@nt Street!')).toBe(false);
    });
    test('should return false if addressTwo includes consecutive spaces', () => {
      expect(tests.isValidAddressTwo('123 Front  Street')).toBe(false);
    });
    test('should return false if addressTwo begins with a space', () => {
      expect(tests.isValidAddressTwo(' 123 Front Street')).toBe(false);
    });
    test('should return false if addressTwo ends with a space', () => {
      expect(tests.isValidAddressTwo('123 Front Street ')).toBe(false);
    });
  });
});

describe('.isValidCity()', () => {
  describe('city is valid', () => {
    test('should return true if city consists of 3-50 letters/spaces/symbols (.-)', () => {
      expect(tests.isValidCity('St. Louis')).toBe(true);
    });
  });
  describe('city is invalid', () => {
    test('should return false if city is less than 3 characters', () => {
      expect(tests.isValidCity('Bo')).toBe(false);
    });
    test('should return false if city is more than 50 characters', () => {
      expect(tests.isValidCity('foo'.repeat(30))).toBe(false);
    });
    test('should return false if city includes symbols (except .-)', () => {
      expect(tests.isValidCity('Tokyo!')).toBe(false);
    });
    test('should return false if city includes consecutive spaces', () => {
      expect(tests.isValidCity('Los  Angeles')).toBe(false);
    });
    test('should return false if city begins with a space', () => {
      expect(tests.isValidCity(' Sacramento')).toBe(false);
    });
    test('should return false if city ends with a space', () => {
      expect(tests.isValidCity('Stockholm ')).toBe(false);
    });
    test('should return false if city is an empty string', () => {
      expect(tests.isValidCity('')).toBe(false);
    });
    test('should return false if city is undefined', () => {
      expect(tests.isValidCity(undefined)).toBe(false);
    });
  });
});
