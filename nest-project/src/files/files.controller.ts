import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream, readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name: string },
  ) {
    return this.filesService.uploadFile({
      ...file,
      originalname: `${body.name}`,
    });
  }

  @Post('/combine')
  async combineChunks(
    @Body() body: { uuid: string; totalChunks: number; fileName: string },
  ) {
    const filePath = join(__dirname, '..', '..', 'uploads', body.fileName);
    const writeStream = createWriteStream(filePath);
    let chunkCount = 0;
    await (async () => {
      while (chunkCount <= body.totalChunks - 1) {
        const chunkPath = join(
          __dirname,
          '..',
          '..',
          'uploads',
          `${body.uuid}-${chunkCount}`,
        );
        const data = readFileSync(chunkPath);
        writeStream.write(data);
        unlinkSync(chunkPath);
        chunkCount++;
      }
    })();

    writeStream.end();
    return `http://localhost:3001/uploads/${body.fileName}`;
  }
}
