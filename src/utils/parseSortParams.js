import { SORT_ORDER, KEYS_OF_STUDENT } from '../constants/index.js';

const parseSortParams = ({ sortOrder, sortBy }) => {
  const parsedSortOrder = SORT_ORDER.includes(sortOrder)
    ? sortOrder
    : SORT_ORDER[0];
  const parsedSortBy = KEYS_OF_STUDENT.includes(sortBy)
    ? sortBy
    : KEYS_OF_STUDENT[0];
  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
export default parseSortParams;
