import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './exceptions/http-exception';
import { FilesController } from './files/files.controller';
import { FilesModule } from './files/files.module';
import { FilesService } from './files/files.service';
import { ReponseInterceptor } from './interceptors/reponse.interceptor';

@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    FilesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'perfumes-store',
      synchronize: true,
    }),
  ],
  controllers: [AppController, FilesController],
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
    FilesService,
    HttpModule,
  ],
})
export class AppModule {}
