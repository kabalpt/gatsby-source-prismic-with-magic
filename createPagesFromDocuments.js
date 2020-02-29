'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPagesFromDocuments = function createPagesFromDocuments(_ref) {
  var createPage = _ref.createPage,
      documents = _ref.documents,
      langs = _ref.langs,
      layoutNames = _ref.layoutNames,
      layouts = _ref.layouts,
      layoutsKey = _ref.layoutsKey,
      onCreatePageDefault = _ref.onCreatePage,
      onCreatePages = _ref.onCreatePages;

  var globalContext = typeof onCreatePages === 'function' ? onCreatePages({ documents: documents }) || {} : {};

  var defaultLang = (0, _keys2.default)(langs).reduce(function (prev, current) {
    return langs[current].default ? current : prev;
  }, null);

  var documentCollection = documents.reduce(function (prev, current) {
    return (0, _extends6.default)({}, prev, (0, _defineProperty3.default)({}, current.type, (0, _extends6.default)({}, (0, _lodash.get)(prev, '' + current.type, {}), (0, _defineProperty3.default)({}, current.uid, (0, _extends6.default)({}, (0, _lodash.get)(prev, current.type + '.' + current.uid, {}), (0, _defineProperty3.default)({}, current.lang, current))))));
  }, {});

  layoutNames.map(function (type) {
    var documentTypes = (0, _keys2.default)(documentCollection).filter(function (documentType) {
      var _documentType$split = documentType.split(layoutsKey),
          _documentType$split2 = (0, _slicedToArray3.default)(_documentType$split, 2),
          _documentType$split2$ = _documentType$split2[1],
          documentSlug = _documentType$split2$ === undefined ? '' : _documentType$split2$;

      return documentSlug.replace('-', '_') === type;
    });

    var _layouts$type = layouts[type],
        component = _layouts$type.component,
        onCreatePage = _layouts$type.onCreatePage;


    if (_lodash.isEmpty[documentTypes] || !component) {
      return;
    }

    documentTypes.forEach(function (documentType) {
      var documents = documentCollection[documentType];

      (0, _keys2.default)(documents).map(function (uid) {
        (0, _keys2.default)(langs).map(function (lang) {
          var document = documents[uid][lang] || documents[uid][defaultLang];

          document.lang = lang;
          document.uid = uid;

          var id = document.id;


          var locale = (0, _lodash.get)(langs, lang);

          var path = (locale && !locale.default ? locale.path : '') + '/' + (uid || id);
          var context = globalContext;

          if (typeof onCreatePageDefault === 'function') {
            context = onCreatePageDefault((0, _extends6.default)({ document: document, documents: documents }, context)) || context;
          }

          if (typeof onCreatePage === 'function') {
            context = onCreatePage((0, _extends6.default)({ document: document, documents: documents }, context)) || context;
            context.onCreatePage = onCreatePage;
          }

          context = (0, _extends6.default)({ document: document }, context);

          if (context.path) {
            var _context = context,
                changedPath = _context.path;


            delete context.path;
            path = changedPath;
          }

          createPage({
            component: component,
            context: context,
            path: path
          });
        });
      });
    });
  });
};

exports.default = createPagesFromDocuments;