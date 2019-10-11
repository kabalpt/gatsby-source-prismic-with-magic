import createPagesFromDocuments from './createPagesFromDocuments';
import fetchData from './fetch';
import getLayouts from './getLayouts';

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
  const { documents } = await fetchData({
    accessToken,
    repositoryName
  });

  const { layoutNames, layouts } = await getLayouts({ layoutNameExceptions, layoutsPath });

  createPagesFromDocuments({
    createPage,
    documents,
    langs,
    layoutNames,
    layouts,
    layoutsKey,
    onCreatePage,
    onCreatePages
  });

  return;
};
