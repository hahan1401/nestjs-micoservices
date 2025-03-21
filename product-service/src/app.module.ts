import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { HttpExceptionFilter } from './exceptions/http-exception';
import { FilesModule } from './files/files.module';
import { ReponseInterceptor } from './interceptors/reponse.interceptor';
import { PerfumesModule } from './perfume/perfume.module';

@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://hanvietha141:hanvietha141@express-nextjs.2aezl0o.mongodb.net/perfume_shop?retryWrites=true&w=majority&appName=express-nextjs',
    ),
    // MongooseModule.forRoot('mongodb://localhost:27017/perfume_shop'),
    FilesModule,
    PerfumesModule,
    CategoryModule,
    BrandModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ReponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
