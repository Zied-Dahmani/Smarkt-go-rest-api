import multer from 'multer';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const MIME_TYPES = { "image/jpg": "jpg", "image/jpeg": "jpg", "image/png": "png" }

export default function(image, size) {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        callback(null, join(__dirname, '../public/images'));
      },
      filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + "." + extension);
      }
    }),
    limits: { fileSize: 10000000 } 
  }).single(image);
}

