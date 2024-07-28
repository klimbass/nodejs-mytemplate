const parseNumber = (num, defValue) => {
  const isString = typeof num === 'string';
  if (!isString) {
    return defValue;
  }
  const parseNum = parseInt(num);
  if (Number.isNaN(parseNum)) {
    return defValue;
  }
  return parseNum;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsePage = parseNumber(page, 1);
  const parsePerPage = parseNumber(perPage, 10);

  return {
    page: parsePage,
    perPage: parsePerPage,
  };
};
