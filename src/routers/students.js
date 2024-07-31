import { Router } from 'express';
import {
  createStudentsController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students.js';
import { validator } from '../middlewares/validator.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createStudentSchema,
  upsertStudentSchema,
} from '../validation/students.js';
import isValidId from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import { upload } from '../middlewares/multer.js';

const studentsRouter = Router();
studentsRouter.use(authenticate);

studentsRouter.get(
  '/',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(getStudentsController),
);

studentsRouter.get(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post(
  '/',
  checkRoles(ROLES.TEACHER),
  upload.single('photo'),
  validator(createStudentSchema),
  ctrlWrapper(createStudentsController),
);

studentsRouter.put(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  upload.single('photo'),
  isValidId,
  validator(upsertStudentSchema),
  ctrlWrapper(upsertStudentController),
);
studentsRouter.patch(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  upload.single('photo'),
  validator(upsertStudentSchema),
  ctrlWrapper(patchStudentController),
);

studentsRouter.delete(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteStudentController),
);

export default studentsRouter;
