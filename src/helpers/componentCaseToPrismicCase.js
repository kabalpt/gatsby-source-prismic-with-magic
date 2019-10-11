const componentCaseToPrismicCase = (componentCase, { exceptions }) => {
  let parsedString = componentCase;

  if (exceptions) {
    Object.keys(exceptions).forEach(key => {
      parsedString = parsedString.replace(key, exceptions[key]);
    });
  }

  parsedString = parsedString.replace(/([A-Z])/g, firstWord => `_${firstWord[0].toLowerCase()}`);

  if (parsedString[0] === '_') {
    parsedString = parsedString.substr(1);
  }

  return parsedString;
};

export default componentCaseToPrismicCase;
