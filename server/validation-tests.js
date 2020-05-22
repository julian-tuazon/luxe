function isValidId(id) {
  return /(?!^0)(^\d+$)/.test(id);
}

function isValidQuantity(quantity) {
  return /(?!^0)(^\d{1,2}$)/.test(quantity);
}

function isValidName(name) {
  return !!name && /^(?!.* {2,})(?=\S)(?=.*\S$)[a-zA-Z ]{5,67}$/.test(name);
}

function isValidAddressOne(addressOne) {
  return !!addressOne && /^(?!.* {2,})(?=\S)(?=.*\S$)[a-zA-Z\d.,# ]{6,42}$/.test(addressOne);
}

function isValidAddressTwo(addressTwo) {
  return !addressTwo || /^(?!.* {2,})(?=\S)(?=.*\S$)[a-zA-Z\d.,# ]{0,42}$/.test(addressTwo);
}

function isValidCity(city) {
  return !!city && /^(?!.* {2,})(?=\S)(?=.*\S$)[a-zA-Z.\- ]{3,50}$/.test(city);
}

function isValidState(state) {
  return /^[a-zA-Z]{2}$/.test(state);
}

function isValidZipCode(zipCode) {
  return /^[\d]{5}$/.test(zipCode);
}

function isValidCardNumber(cardNumber) {
  return /^[\d]{16}$/.test(cardNumber);
}

function isValidCardMonth(cardMonth) {
  return /^[\d]{2}$/.test(cardMonth);
}

function isValidCardYear(cardYear) {
  return /^[\d]{4}$/.test(cardYear);
}

function isValidCardCVV(cardCVV) {
  return /^[\d]{3,4}$/.test(cardCVV);
}

exports.isValidId = isValidId;
exports.isValidQuantity = isValidQuantity;
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
