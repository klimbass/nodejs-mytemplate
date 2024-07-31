import mongoose from 'mongoose';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../services/students.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseFilterParams from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const students = await getAllStudents({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  });
  console.log(students);
  res.status(200).json({
    status: 200,
    data: students,
    message: 'Successfully found students!',
  });
};

export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    next(createHttpError(404, 'Invalid student ID'));
    return;
  }

  try {
    const student = await getStudentById(studentId);
    console.log(`Student: ${student}`);
    if (!student) {
      next(createHttpError(404, 'Student not found'));
      return;
    }

    res.status(200).json({
      status: 200,
      data: student,
      message: `Successfully found student with id ${studentId}!`,
    });
  } catch (error) {
    next(error);
  }
};

export const createStudentsController = async (req, res) => {
  const photo = req.file;
  let photoURL;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoURL = await saveFileToCloudinary(photo);
    } else {
      photoURL = await saveFileToUploadDir(photo);
    }
  }
  const student = await createStudent({ ...req.body, photo: photoURL });
  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: student,
  });
};

export const deleteStudentController = async (req, res, next) => {
  const { studentId } = req.params;

  const student = await deleteStudent(studentId);

  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const photo = req.file;

  let photoURL;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoURL = await saveFileToCloudinary(photo);
    } else {
      photoURL = await saveFileToUploadDir(photo);
    }
  }
  const result = await updateStudent(
    studentId,
    { ...req.body, photo: photoURL },
    {
      upsert: true,
    },
  );

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: result.student,
  });
};

export const patchStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const photo = req.file;

  let photoURL;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoURL = await saveFileToCloudinary(photo);
    } else {
      photoURL = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateStudent(studentId, {
    ...req.body,
    photo: photoURL,
  });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.student,
  });
};
