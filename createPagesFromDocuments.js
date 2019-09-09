'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPagesFromDocuments = function createPagesFromDocuments(_ref) {
  var createPage = _ref.createPage,
      documents = _ref.documents,
      langs = _ref.langs,
      layoutNames = _ref.layoutNames,
      layouts = _ref.layouts,
      onCreatePageDefault = _ref.onCreatePage,
      onCreatePages = _ref.onCreatePages;

  var context = typeof onCreatePages === 'function' ? onCreatePages({ documents: documents }) || {} : {};

  layoutNames.map(function (type) {
    var results = documents.filter(function (document) {
      return document.type === type;
    });
    var _layouts$type = layouts[type],
        component = _layouts$type.component,
        onCreatePage = _layouts$type.onCreatePage;


    if (!results || !component) {
      return;
    }

    results.forEach(function (document) {
      var id = document.id,
          lang = document.lang,
          uid = document.uid;

      var locale = (0, _lodash.get)(langs, '.' + lang);
      var path = (locale && !locale.default ? locale.path : '') + '/' + (uid || id);

      if (typeof onCreatePageDefault === 'function') {
        context = (0, _extends3.default)({}, context, onCreatePageDefault((0, _extends3.default)({ document: document, documents: documents }, context)));
      }

      if (typeof onCreatePage === 'function') {
        context = (0, _extends3.default)({}, context, onCreatePage((0, _extends3.default)({ document: document, documents: documents }, context)));
      }

      context = (0, _extends3.default)({ document: document }, context);

      if (context.path) {
        path = { context: context };
        delete context.path;
      }

      createPage({
        component: component,
        context: context,
        path: path
      });
    });
  });
};

exports.default = createPagesFromDocuments;