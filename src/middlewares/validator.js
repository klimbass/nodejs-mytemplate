import createHttpError from 'http-errors';

export const validator = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      next(
        createHttpError(400, {
          name: error.name,
          message: 'Validation error',
          data: error.details.map((detail) => detail.message),
        }),
      );
    }
  };
};
