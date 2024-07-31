import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }
  const [bearer, token] = authHeader.split(' ');
  if (!bearer) {
    return next(createHttpError(401, 'Token must have Bearer type'));
  }
  if (!token) {
    return next(createHttpError(401, 'Token missing'));
  }
  const session = await SessionCollection.findOne({
    accessToken: token,
  });
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }
  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
  }
  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }
  req.user = user;
  next();
};
