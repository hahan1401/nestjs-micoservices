import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRODUCT_SERVICE') private productClient: ClientProxy,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    return this.productClient.send('productService.category.getAll', {});
  }
}
