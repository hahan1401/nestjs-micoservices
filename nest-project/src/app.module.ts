import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { HttpExceptionFilter } from './exceptions/http-exception';
import { FilesController } from './files/files.controller';
import { FilesModule } from './files/files.module';
import { FilesService } from './files/files.service';
import { ReponseInterceptor } from './interceptors/reponse.interceptor';
import { initializeDatabase } from './lib/database';
import { PerfumesController } from './perfume/perfume.controller';
import { PerfumesModule } from './perfume/perfume.module';
import { PerfumesService } from './perfume/perfume.service';

@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await initializeDatabase();
        console.log('__dirname', __dirname);
        return {
          type: 'mysql',
          // host: 'localhost',
          host: '172.31.53.108',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'perfume_store',
          synchronize: true,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
    }),
    FilesModule,
    PerfumesModule,
    CategoryModule,
  ],
  controllers: [AppController, FilesController, PerfumesController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ReponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    HttpModule,
    AppService,
    FilesService,
    PerfumesService,
  ],
})
export class AppModule { }
