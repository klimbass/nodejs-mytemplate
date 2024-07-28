import { GENDER_STUDENT } from '../constants/index.js';

const parseGender = (gender) => {
  const isString = typeof gender === 'string';
  if (!isString) {
    return;
  }
  const isGender = GENDER_STUDENT.includes(gender);
  if (isGender) {
    return gender;
  }
  return;
};

const parseNum = (num) => {
  const isString = typeof num === 'string';
  if (!isString) {
    return;
  }
  const parsedNum = parseInt(num);
  if (Number.isNaN(parseNum)) {
    return;
  }
  return parsedNum;
};

const parseFilterParams = (query) => {
  const { gender, maxAge, minAge, maxAvgMark, minAvgMark } = query;
  const parsedGender = parseGender(gender);
  const parsedMaxAge = parseNum(maxAge);
  const parsedMinAge = parseNum(minAge);
  const parsedMaxAvgMark = parseNum(maxAvgMark);
  const parsedMinAvgMark = parseNum(minAvgMark);
  return {
    gender: parsedGender,
    maxAge: parsedMaxAge,
    minAge: parsedMinAge,
    maxAvgMark: parsedMaxAvgMark,
    minAvgMark: parsedMinAvgMark,
  };
};

export default parseFilterParams;
