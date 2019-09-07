import { camelCase, isArray, isPlainObject } from 'lodash';

const keysToCamel = object => {
  if (!isPlainObject(object) && !isArray(object)) {
    return object;
  }

  if (isPlainObject(object)) {
    const newObject = {};

    Object.keys(object).forEach(key => {
      newObject[camelCase(key)] = keysToCamel(object[key]);
    });

    return newObject;
  }

  return object.map(index => {
    return keysToCamel(index);
  });
};

export default keysToCamel;
