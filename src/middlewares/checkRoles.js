import createHttpError from 'http-errors';
import { ROLES } from '../constants/index.js';
import { StudentsCollection } from '../db/models/student.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }
    const { role } = user;
    if (roles.includes(ROLES.TEACHER) && role === ROLES.TEACHER) {
      return next();
    }
    if (roles.includes(ROLES.PARENT) && role === ROLES.PARENT) {
      const { studentId } = req.params;
      if (!studentId) {
        return next(createHttpError(403, 'Forbidden'));
      }
      console.log(`Student ID: ${studentId}, Parent ID: ${user._id}`);
      const student = await StudentsCollection.findOne({
        _id: studentId,
        parentId: user._id,
      });
      console.log(`Student: ${student}`);
      if (student) {
        console.log('Im work');
        return next();
      }
    }
    next(createHttpError(403, 'Forbidden'));
  };
