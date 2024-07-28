import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoDB = async () => {
  try {
    const user = env('MANGODB_USER');
    const pwd = env('MANGODB_PASSWORD');
    const url = env('MANGODB_URL');
    const db = env('MANGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
