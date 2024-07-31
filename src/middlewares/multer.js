import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage(
  {
    destination: TEMP_UPLOAD_DIR,
  },
  {
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now();
      cb(null, `${uniquePrefix}_${file.originalname}`);
    },
  },
);

export const upload = multer({ storage });
