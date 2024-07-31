import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

const isValidId = (req, res, next) => {
  const { studentId } = req.params;
  if (!isValidObjectId(studentId)) {
    next(createHttpError(404, 'Not found'));
  }
  next();
};

export default isValidId;
