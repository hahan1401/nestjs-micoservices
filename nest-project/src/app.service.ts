import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async calltoServer2(): Promise<string> {
    return await firstValueFrom(this.httpService.get('http://server2:3002'))
      .then((resp) => resp.data)
      .catch(() => {
        throw new HttpException(
          { a: 1, b: 2 },
          HttpStatusCode.InternalServerError,
        );
      });
  }
}
