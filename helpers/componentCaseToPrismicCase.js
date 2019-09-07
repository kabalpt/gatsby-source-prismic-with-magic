'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentCaseToPrismicCase = function componentCaseToPrismicCase(componentCase, _ref) {
  var exceptions = _ref.exceptions;

  var parsedString = componentCase;

  if (exceptions) {
    (0, _keys2.default)(exceptions).forEach(function (key) {
      parsedString = parsedString.replace(key, exceptions[key]);
    });
  }

  parsedString = parsedString.replace(/([A-Z])/g, function (firstWord) {
    return '-' + firstWord[0].toLowerCase();
  });

  if (parsedString[0] === '-') {
    parsedString = parsedString.substr(1);
  }

  return parsedString;
};

exports.default = componentCaseToPrismicCase;