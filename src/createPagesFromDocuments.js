import { get } from 'lodash';

const createPagesFromDocuments = ({
  createPage,
  documents,
  langs,
  layoutNames,
  layouts,
  layoutsKey,
  onCreatePage: onCreatePageDefault,
  onCreatePages
}) => {
  const globalContext = typeof onCreatePages === 'function' ? onCreatePages({ documents }) || {} : {};

  layoutNames.map(type => {
    const results = documents.filter(document => {
      const [, documentSlug] = document.type.split(layoutsKey);

      return documentSlug.replace('-', '_') === type;
    });
    const { component, onCreatePage } = layouts[type];

    if (!results || !component) {
      return;
    }

    results.forEach(document => {
      const { id, lang, uid } = document;
      const locale = get(langs, `.${lang}`);
      let path = `${locale && !locale.default ? locale.path : ''}/${uid || id}`;
      let context = globalContext;

      if (typeof onCreatePageDefault === 'function') {
        context = onCreatePageDefault({ document, documents, ...context }) || context;
      }

      if (typeof onCreatePage === 'function') {
        context = onCreatePage({ document, documents, ...context }) || context;
      }

      context = { document, ...context };

      if (context.path) {
        const { path: changedPath } = context;

        delete context.path;
        path = changedPath;
      }

      createPage({
        component,
        context,
        path
      });
    });
  });
};

export default createPagesFromDocuments;
