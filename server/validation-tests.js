function isValidNum(num) {
  return /(?!^0)(^\d+$)/.test(num);
}

function isValidName(name) {
  return name && /^(?!.* {2,})(?=\S)(?=.*\S$)[a-zA-Z ]{5,67}$/.test(name);
}

function isValidAddressOne(addressOne) {
  return addressOne && /^(?!.* {2,})(?=\S)(?=.*\S$)[a-zA-Z\d.,# ]{6,42}$/.test(addressOne);
}

function isValidAddressTwo(addressTwo) {
  if (addressTwo) return /^(?!.* {2,})(?=\S)(?=.*\S$)[a-zA-Z\d.,# ]{0,42}$/.test(addressTwo);
  return true;
}

function isValidCity(city) {
  return city && /^(?!.* {2,})(?=\S)(?=.*\S$)[a-zA-Z.\- ]{3,50}$/.test(city);
}

function isValidState(state) {
  return state && /^[a-zA-Z]{2}$/.test(state);
}

function isValidZipCode(zipCode) {
  return zipCode && /^[\d]{5}$/.test(zipCode);
}

function isValidCardNumber(cardNumber) {
  return cardNumber && /^[\d]{16}$/.test(cardNumber);
}

function isValidCardMonth(cardMonth) {
  return cardMonth && /^[\d]{2}$/.test(cardMonth);
}

function isValidCardYear(cardYear) {
  return cardYear && /^[\d]{4}$/.test(cardYear);
}

function isValidCardCVV(cardCVV) {
  return cardCVV && /^[\d]{3,4}$/.test(cardCVV);
}

exports.isValidNum = isValidNum;
exports.isValidName = isValidName;
exports.isValidAddressOne = isValidAddressOne;
exports.isValidAddressTwo = isValidAddressTwo;
exports.isValidCity = isValidCity;
exports.isValidState = isValidState;
exports.isValidZipCode = isValidZipCode;
exports.isValidCardNumber = isValidCardNumber;
exports.isValidCardMonth = isValidCardMonth;
exports.isValidCardYear = isValidCardYear;
exports.isValidCardCVV = isValidCardCVV;
