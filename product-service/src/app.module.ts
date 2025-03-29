import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { CustomerModule } from './customer/customer.module';
import { HttpExceptionFilter } from './exceptions/http-exception';
import { FilesModule } from './files/files.module';
import { ReponseInterceptor } from './interceptors/reponse.interceptor';
import { OrderStatusModule } from './order-status/order-status.module';
import { OrderModule } from './order/order.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PerfumeCollectionsModule } from './perfume-collections/perfume-collections.module';
import { RoleModule } from './role/role.module';
import { ShippingMethodModule } from './shipping-method/shipping-method.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://hanvietha141:hanvietha141@express-nextjs.2aezl0o.mongodb.net/perfume_shop?retryWrites=true&w=majority&appName=express-nextjs',
    ),
    // MongooseModule.forRoot('mongodb://localhost:27017/perfume_shop'),
    // MongooseModule.forRoot('mongodb://192.168.1.29:27017/perfume_shop'),
    FilesModule,
    CategoryModule,
    BrandModule,
    OrderModule,
    CustomerModule,
    OrderStatusModule,
    PaymentMethodModule,
    ShippingMethodModule,
    AuthModule,
    RoleModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXP'),
        },
      }),
      global: true,
    }),
    PerfumeCollectionsModule,
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
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
