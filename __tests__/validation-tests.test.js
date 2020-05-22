const tests = require('../server/validation-tests');

describe('.isValidId()', () => {
  describe('valid id', () => {
    test('should return true if number is a positive integer', () => {
      expect(tests.isValidId('2')).toBe(true);
    });
  });
  describe('invalid id', () => {
    test('should return false if id is a negative integer', () => {
      expect(tests.isValidId('-1')).toBe(false);
    });
    test('should return false if id is 0', () => {
      expect(tests.isValidId('0')).toBe(false);
    });
    test('should return false if id is a non-integer decimal', () => {
      expect(tests.isValidId('1.5')).toBe(false);
    });
    test('should return false if id includes letters', () => {
      expect(tests.isValidId('2two')).toBe(false);
    });
    test('should return false if id is an empty string', () => {
      expect(tests.isValidId('')).toBe(false);
    });
    test('should return false if id is undefined', () => {
      expect(tests.isValidId(undefined)).toBe(false);
    });
  });
});

describe('isValidQuantity', () => {
  describe('valid quantity', () => {
    test('should return true if quantity is a 1 digit, positive integer between 1-99', () => {
      expect(tests.isValidQuantity('7')).toBe(true);
    });
    test('should return true if quantity is a 2 digit, positive integer between 1-99', () => {
      expect(tests.isValidQuantity('23')).toBe(true);
    });
  });
  describe('invalid quantity', () => {
    test('should return false if quantity is a negative integer', () => {
      expect(tests.isValidQuantity('-1')).toBe(false);
    });
    test('should return false if quantity is 0', () => {
      expect(tests.isValidQuantity('0')).toBe(false);
    });
    test('should return false if quantity is a non-integer decimal', () => {
      expect(tests.isValidQuantity('1.5')).toBe(false);
    });
    test('should return false if quantity is a 3 digit, positive integer greater than 99', () => {
      expect(tests.isValidQuantity('120')).toBe(false);
    });
    test('should return false if quantity includes letters', () => {
      expect(tests.isValidQuantity('2o')).toBe(false);
    });
    test('should return false if quantity is an empty string', () => {
      expect(tests.isValidQuantity('')).toBe(false);
    });
    test('should return false if quantity is undefined', () => {
      expect(tests.isValidQuantity(undefined)).toBe(false);
    });
  });
});

describe('.isValidName()', () => {
  describe('valid name', () => {
    test('should return true if name consists of 5-67 letters/spaces', () => {
      expect(tests.isValidName('John Doe')).toBe(true);
    });
  });
  describe('invalid name', () => {
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
  describe('valid addressOne', () => {
    test('should return true if addressOne consists of 6-42 alphanumeric chars/spaces/symbols (.,#)', () => {
      expect(tests.isValidAddressOne('123 Front Street')).toBe(true);
    });
  });
  describe('invalid addressOne', () => {
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
  describe('valid addressTwo', () => {
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
  describe('invalid addressTwo', () => {
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
  describe('valid city', () => {
    test('should return true if city consists of 3-50 letters/spaces/symbols (.-)', () => {
      expect(tests.isValidCity('St. Louis')).toBe(true);
    });
  });
  describe('invalid city', () => {
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

describe('.isValidState()', () => {
  describe('valid state', () => {
    test('should return true if state consists of 2 letters', () => {
      expect(tests.isValidState('CA')).toBe(true);
    });
  });
  describe('invalid state', () => {
    test('should return false if state is less than 2 letters', () => {
      expect(tests.isValidState('C')).toBe(false);
    });
    test('should return false if state is more than 2 letters', () => {
      expect(tests.isValidState('CAL')).toBe(false);
    });
    test('should return false if state includes numbers', () => {
      expect(tests.isValidState('99')).toBe(false);
    });
    test('should return false if state includes symbols', () => {
      expect(tests.isValidState('--')).toBe(false);
    });
    test('should return false if state includes spaces', () => {
      expect(tests.isValidState('C ')).toBe(false);
    });
    test('should return false if state is an empty string', () => {
      expect(tests.isValidState('')).toBe(false);
    });
    test('should return false if state is undefined', () => {
      expect(tests.isValidState(undefined)).toBe(false);
    });
  });
});

describe('.isValidZipCode()', () => {
  describe('valid zipCode', () => {
    test('should return true if zipCode consists of 5 numbers', () => {
      expect(tests.isValidZipCode('97231')).toBe(true);
    });
  });
  describe('invalid zipCode', () => {
    test('should return false if zipCode is less than 5 numbers', () => {
      expect(tests.isValidZipCode('143')).toBe(false);
    });
    test('should return false if zipCode is more than 5 numbers', () => {
      expect(tests.isValidZipCode('821145')).toBe(false);
    });
    test('should return false if zipCode includes letters', () => {
      expect(tests.isValidZipCode('zip12')).toBe(false);
    });
    test('should return false if zipCode includes symbols', () => {
      expect(tests.isValidZipCode('1234$')).toBe(false);
    });
    test('should return false if zipCode includes spaces', () => {
      expect(tests.isValidZipCode('1 234')).toBe(false);
    });
    test('should return false if zipCode is an empty string', () => {
      expect(tests.isValidZipCode('')).toBe(false);
    });
    test('should return false if zipCode is undefined', () => {
      expect(tests.isValidZipCode(undefined)).toBe(false);
    });
  });
});

describe('.isValidCardNumber()', () => {
  describe('valid cardNumber', () => {
    test('should return true if cardNumber consists of 16 numbers', () => {
      expect(tests.isValidCardNumber('9723137583647323')).toBe(true);
    });
  });
  describe('invalid cardNumber', () => {
    test('should return false if cardNumber is less than 16 numbers', () => {
      expect(tests.isValidCardNumber('143')).toBe(false);
    });
    test('should return false if cardNumber is more than 16 numbers', () => {
      expect(tests.isValidCardNumber('8'.repeat(20))).toBe(false);
    });
    test('should return false if cardNumber includes letters', () => {
      expect(tests.isValidCardNumber('a723137583647323')).toBe(false);
    });
    test('should return false if cardNumber includes symbols', () => {
      expect(tests.isValidCardNumber('@723137583647323')).toBe(false);
    });
    test('should return false if cardNumber includes spaces', () => {
      expect(tests.isValidCardNumber('7 23137583647323')).toBe(false);
    });
    test('should return false if cardNumber is an empty string', () => {
      expect(tests.isValidCardNumber('')).toBe(false);
    });
    test('should return false if cardNumber is undefined', () => {
      expect(tests.isValidCardNumber(undefined)).toBe(false);
    });
  });
});

describe('.isValidCardMonth()', () => {
  describe('valid cardMonth', () => {
    test('should return true if cardMonth consists of 2 numbers', () => {
      expect(tests.isValidCardMonth('11')).toBe(true);
    });
  });
  describe('invalid cardMonth', () => {
    test('should return false if cardMonth is less than 2 numbers', () => {
      expect(tests.isValidCardMonth('1')).toBe(false);
    });
    test('should return false if cardMonth is more than 2 numbers', () => {
      expect(tests.isValidCardMonth('413')).toBe(false);
    });
    test('should return false if cardMonth includes letters', () => {
      expect(tests.isValidCardMonth('a7')).toBe(false);
    });
    test('should return false if cardMonth includes symbols', () => {
      expect(tests.isValidCardMonth('@7')).toBe(false);
    });
    test('should return false if cardMonth includes spaces', () => {
      expect(tests.isValidCardMonth('1 ')).toBe(false);
    });
    test('should return false if cardMonth is an empty string', () => {
      expect(tests.isValidCardMonth('')).toBe(false);
    });
    test('should return false if cardMonth is undefined', () => {
      expect(tests.isValidCardMonth(undefined)).toBe(false);
    });
  });
});

describe('.isValidCardYear()', () => {
  describe('valid cardYear', () => {
    test('should return true if cardYear consists of 4 numbers', () => {
      expect(tests.isValidCardYear('2021')).toBe(true);
    });
  });
  describe('invalid cardYear', () => {
    test('should return false if cardYear is less than 4 numbers', () => {
      expect(tests.isValidCardYear('202')).toBe(false);
    });
    test('should return false if cardYear is more than 4 numbers', () => {
      expect(tests.isValidCardYear('20222')).toBe(false);
    });
    test('should return false if cardYear includes letters', () => {
      expect(tests.isValidCardYear('a202')).toBe(false);
    });
    test('should return false if cardYear includes symbols', () => {
      expect(tests.isValidCardYear('@202')).toBe(false);
    });
    test('should return false if cardYear includes spaces', () => {
      expect(tests.isValidCardYear('202 ')).toBe(false);
    });
    test('should return false if cardYear is an empty string', () => {
      expect(tests.isValidCardYear('')).toBe(false);
    });
    test('should return false if cardYear is undefined', () => {
      expect(tests.isValidCardYear(undefined)).toBe(false);
    });
  });
});

describe('.isValidCardCVV()', () => {
  describe('valid cardCVV', () => {
    test('should return true if cardCVV consists of 3 numbers', () => {
      expect(tests.isValidCardCVV('123')).toBe(true);
    });
    test('should return true if cardCVV consists of 4 numbers', () => {
      expect(tests.isValidCardCVV('1234')).toBe(true);
    });
  });
  describe('invalid cardCVV', () => {
    test('should return false if cardCVV is less than 3 numbers', () => {
      expect(tests.isValidCardCVV('12')).toBe(false);
    });
    test('should return false if cardCVV is more than 4 numbers', () => {
      expect(tests.isValidCardCVV('12345')).toBe(false);
    });
    test('should return false if cardCVV includes letters', () => {
      expect(tests.isValidCardCVV('a12')).toBe(false);
      expect(tests.isValidCardCVV('a123')).toBe(false);
    });
    test('should return false if cardCVV includes symbols', () => {
      expect(tests.isValidCardCVV('@12')).toBe(false);
      expect(tests.isValidCardCVV('@123')).toBe(false);
    });
    test('should return false if cardCVV includes spaces', () => {
      expect(tests.isValidCardCVV('12 ')).toBe(false);
      expect(tests.isValidCardCVV('123 ')).toBe(false);
    });
    test('should return false if cardCVV is an empty string', () => {
      expect(tests.isValidCardCVV('')).toBe(false);
    });
    test('should return false if cardCVV is undefined', () => {
      expect(tests.isValidCardCVV(undefined)).toBe(false);
    });
  });
});
