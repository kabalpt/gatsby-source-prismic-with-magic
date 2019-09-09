import { readdirSync, statSync } from 'fs';
import componentCaseToPrismicCase from './helpers/componentCaseToPrismicCase';
import path from 'path';

const getLayouts = async ({ layoutNameExceptions, layoutsKey, layoutsPath }) => {
  const layouts = await readdirSync(layoutsPath)
    .filter(file => statSync(path.join(layoutsPath, file)).isDirectory())
    .reduce((result, name) => {
      let onCreatePage;

      try {
        onCreatePage = require(path.resolve(path.join(layoutsPath, name, 'onCreatePage.js')));
      } catch (error) {
        onCreatePage = undefined;
      }

      return {
        ...result,
        [`${layoutsKey}${componentCaseToPrismicCase(name, {
          exceptions: layoutNameExceptions
        })}`]: {
          component: path.resolve(path.join(layoutsPath, name, `${name}.js`)),
          onCreatePage
        }
      };
    }, {});

  const layoutNames = Object.keys(layouts);

  return { layoutNames, layouts };
};

export default getLayouts;
