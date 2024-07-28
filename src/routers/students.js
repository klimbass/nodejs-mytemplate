import { Router } from 'express';
import {
  createStudentsController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  upsertStudentController,
} from '../controllers/students.js';
import { validator } from '../middlewares/validator.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createStudentSchema,
  upsertStudentSchema,
} from '../validation/createStudentSchema.js';
import isValidId from '../middlewares/isValidId.js';

const studentsRouter = Router();

studentsRouter.get('/', ctrlWrapper(getStudentsController));

studentsRouter.get(
  '/:studentId',
  isValidId,
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post(
  '/',
  validator(createStudentSchema),
  ctrlWrapper(createStudentsController),
);

studentsRouter.delete(
  '/:studentId',
  isValidId,
  ctrlWrapper(deleteStudentController),
);

studentsRouter.put(
  '/:studentId',
  isValidId,
  validator(upsertStudentSchema),
  ctrlWrapper(upsertStudentController),
);

export default studentsRouter;
