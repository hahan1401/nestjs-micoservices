import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const filePath = join(__dirname, '..', '..', 'uploads', file.originalname);
    const writeStream = createWriteStream(filePath);
    writeStream.write(file.buffer);
    writeStream.end();
    await (async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      }))();
    return 'File uploaded successfully';
  }
}
