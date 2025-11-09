import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { UPLOAD_DESTINATION, ALLOWED_FILE_TYPES } from '../constants';

export const createFileUploadInterceptor = () => {
  return FileInterceptor('poster', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        if (!existsSync(UPLOAD_DESTINATION)) {
          mkdirSync(UPLOAD_DESTINATION, { recursive: true });
        }
        cb(null, UPLOAD_DESTINATION);
      },
      filename: (req, file, cb) => {
        const userId = (req.user as { id: string } | undefined)?.id || 'anonymous';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${userId}-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(ALLOWED_FILE_TYPES)) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
  });
};

