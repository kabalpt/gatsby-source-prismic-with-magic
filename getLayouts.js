'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _componentCaseToPrismicCase = require('./helpers/componentCaseToPrismicCase');

var _componentCaseToPrismicCase2 = _interopRequireDefault(_componentCaseToPrismicCase);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLayouts = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var layoutNameExceptions = _ref2.layoutNameExceptions,
        layoutsPath = _ref2.layoutsPath;
    var layouts, layoutNames;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fs.readdirSync)(layoutsPath).filter(function (file) {
              return (0, _fs.statSync)(_path2.default.join(layoutsPath, file)).isDirectory();
            }).reduce(function (result, name) {
              var onCreatePage = void 0;

              try {
                onCreatePage = require(_path2.default.resolve(_path2.default.join(layoutsPath, name, 'onCreatePage.js')));
              } catch (error) {
                onCreatePage = undefined;
              }

              return (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, '' + (0, _componentCaseToPrismicCase2.default)(name, {
                exceptions: layoutNameExceptions
              }), {
                component: _path2.default.resolve(_path2.default.join(layoutsPath, name, name + '.js')),
                onCreatePage: onCreatePage
              }));
            }, {});

          case 2:
            layouts = _context.sent;
            layoutNames = (0, _keys2.default)(layouts);
            return _context.abrupt('return', { layoutNames: layoutNames, layouts: layouts });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getLayouts(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = getLayouts;