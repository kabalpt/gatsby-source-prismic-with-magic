import { get } from 'lodash';

const createPagesFromDocuments = ({
  createPage,
  documents,
  langs,
  layoutNames,
  layouts,
  onCreatePage: onCreatePageDefault,
  onCreatePages
}) => {
  let context = typeof onCreatePages === 'function' ? onCreatePages({ documents }) || {} : {};

  layoutNames.map(type => {
    const results = documents.filter(document => document.type === type);
    const { component, onCreatePage } = layouts[type];

    if (!results || !component) {
      return;
    }

    results.forEach(document => {
      const { id, lang, uid } = document;
      const locale = get(langs, `.${lang}`);
      const path = `${locale && !locale.default ? locale.path : ''}/${uid || id}`;

      if (typeof onCreatePageDefault === 'function') {
        context = { ...context, ...onCreatePageDefault({ document, documents, ...context }) };
      }

      if (typeof onCreatePage === 'function') {
        context = { ...context, ...onCreatePage({ document, documents, ...context }) };
      }

      context = { document, ...context };

      createPage({
        component,
        context,
        path
      });
    });
  });
};

export default createPagesFromDocuments;
