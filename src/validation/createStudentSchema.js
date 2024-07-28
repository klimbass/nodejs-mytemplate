import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'User name should be a string',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().messages({
    'string.email': `"email" must be a valid email`,
  }),
  age: Joi.number().integer().min(6).max(16).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  avgMark: Joi.number().min(2).max(12).required(),
  onDuty: Joi.boolean(),
});

export const upsertStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.base': 'User name should be a string',
  }),
  email: Joi.string().email().messages({
    'string.email': `"email" must be a valid email`,
  }),
  age: Joi.number().integer().min(6).max(16),
  gender: Joi.string().valid('male', 'female', 'other'),
  avgMark: Joi.number().min(2).max(12),
  onDuty: Joi.boolean(),
});
