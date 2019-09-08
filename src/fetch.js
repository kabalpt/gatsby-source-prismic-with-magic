import Prismic from 'prismic-javascript';
import keysToCamel from './helpers/keysToCamel';

const getDocuments = async ({ client, lang, mergedResponse = [], page = 1, pageSize = 100 }) => {
  const { results, total_results_size: totalResults } = await client.query([], { lang, page, pageSize });

  mergedResponse = [...mergedResponse, ...results];

  if (page * pageSize < totalResults) {
    return getDocuments({ client, lang, mergedResponse, page: page + 1, pageSize });
  }

  return keysToCamel(mergedResponse);
};

export default async ({ repositoryName, accessToken, lang = '*' }) => {
  console.time(`Fetch Prismic data`);
  console.log(`Starting to fetch data from Prismic`);

  const apiEndpoint = `https://${repositoryName}.prismic.io/api/v2`;
  const client = await Prismic.api(apiEndpoint, { accessToken });
  const documents = await getDocuments({ client, lang });

  console.timeEnd(`Fetch Prismic data`);

  return {
    documents
  };
};
