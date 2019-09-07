export const camelcaseToDashcase = (camelCaseString, exceptions) => {
  let parsedString = camelCaseString;

  if (exceptions) {
    Object.keys(exceptions).forEach(key => {
      parsedString = parsedString.replace(key, exceptions[key]);
    });
  }

  parsedString = parsedString.replace(/([A-Z])/g, firstWord => `-${firstWord[0].toLowerCase()}`);

  if (parsedString[0] === '-') {
    parsedString = parsedString.substr(1);
  }

  return parsedString;
};

export default camelcaseToDashcase;
