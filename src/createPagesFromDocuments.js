import { get, isEmpty } from 'lodash';

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

  const defaultLang = Object.keys(langs).reduce((prev, current) => (langs[current].default ? current : prev), null);

  const documentCollection = documents.reduce(
    (prev, current) => ({
      ...prev,
      [current.type]: {
        ...get(prev, `${current.type}`, {}),
        [current.uid]: {
          ...get(prev, `${current.type}.${current.uid}`, {}),
          [current.lang]: current
        }
      }
    }),
    {}
  );

  layoutNames.map(type => {
    const documentTypes = Object.keys(documentCollection).filter(documentType => {
      const [, documentSlug = ''] = documentType.split(layoutsKey);

      return documentSlug.replace('-', '_') === type;
    });

    const { component, onCreatePage } = layouts[type];

    if (isEmpty[documentTypes] || !component) {
      return;
    }

    documentTypes.forEach(documentType => {
      const documents = documentCollection[documentType];

      Object.keys(documents).map(uid => {
        Object.keys(langs).map(lang => {
          const document = documents[uid][lang] || documents[uid][defaultLang];

          document.lang = lang;
          document.uid = uid;

          const { id } = document;

          const locale = get(langs, lang);

          let path = `${locale && !locale.default ? locale.path : ''}/${uid || id}`;
          let context = globalContext;

          if (typeof onCreatePageDefault === 'function') {
            context = onCreatePageDefault({ document, documents, ...context }) || context;
          }

          if (typeof onCreatePage === 'function') {
            context = onCreatePage({ document, documents, ...context }) || context;
            context.onCreatePage = onCreatePage;
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
    });
  });
};

export default createPagesFromDocuments;
