import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import { join } from 'path';
import { csvToJson } from './utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.appService.getHello());
      }, 3000);
    });
  }
  @Get('/0')
  async getHello_(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.appService.getHello());
      }, 3000);
    });
  }

  @Get('/2')
  calltoServer2() {
    return this.appService.calltoServer2();
  }

  @Get('/convert-csv')
  async convertCsv() {
    const uploadDir = join(process.cwd(), 'uploads');

    const filePath = join(uploadDir, 'csv.csv');
    const csvFile = fs.readFileSync(filePath, 'utf8');
    const data = csvToJson(csvFile);
    return data;
  }
}
