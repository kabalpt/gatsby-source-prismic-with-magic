'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keysToCamel = function keysToCamel(object) {
  if (!(0, _lodash.isPlainObject)(object) && !(0, _lodash.isArray)(object)) {
    return object;
  }

  if ((0, _lodash.isPlainObject)(object)) {
    var newObject = {};

    (0, _keys2.default)(object).forEach(function (key) {
      newObject[(0, _lodash.camelCase)(key)] = keysToCamel(object[key]);
    });

    return newObject;
  }

  return object.map(function (index) {
    return keysToCamel(index);
  });
};

exports.default = keysToCamel;