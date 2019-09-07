import createPagesFromDocuments from './createPagesFromDocuments';
import fetchData from './fetch';
import getLayouts from './getLayouts';
import keysToCamel from './helpers/keysToCamel';

export const createPages = async (
  { actions: { createPage } },
  {
    accessToken,
    langs,
    layoutsKey = 'page_-_',
    layoutNameExceptions = {},
    layoutsPath = 'src/layouts',
    onCreatePage,
    onCreatePages,
    repositoryName
  }
) => {
  const { documents: documentsFromSource } = await fetchData({
    accessToken,
    repositoryName
  });

  const documents = keysToCamel(documentsFromSource);

  const { layoutNames, layouts } = await getLayouts({ layoutNameExceptions, layoutsKey, layoutsPath });

  createPagesFromDocuments({ createPage, documents, langs, layoutNames, layouts, onCreatePage, onCreatePages });

  return;
};
