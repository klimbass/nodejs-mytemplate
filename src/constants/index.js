import path from 'node:path';

export const SORT_ORDER = ['asc', 'desc'];
export const KEYS_OF_STUDENT = [
  '_id',
  'name',
  'email',
  'age',
  'gender',
  'avgMark',
  'onDuty',
  'createdAt',
  'updatedAt',
];

export const GENDER_STUDENT = ['male', 'female', 'other'];

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;
export const ROLES = {
  TEACHER: 'teacher',
  PARENT: 'parent',
};

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.resolve('src', 'templates');
