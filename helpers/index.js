'use strict';

import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$keys from 'babel-runtime/core-js/object/keys';
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _camelCaseToDashcase = require('./camelCaseToDashcase');

_Object$keys(_camelCaseToDashcase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _camelCaseToDashcase[key];
    }
  });
});

var _componentCaseToPrismicCase = require('./componentCaseToPrismicCase');

_Object$keys(_componentCaseToPrismicCase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _componentCaseToPrismicCase[key];
    }
  });
});

var _keysToCamel = require('./keysToCamel');

_Object$keys(_keysToCamel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _keysToCamel[key];
    }
  });
});