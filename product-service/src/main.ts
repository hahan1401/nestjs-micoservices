import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  await app.listen(4000);
}
bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     AppModule,
//     {
//       transport: Transport.TCP,
//       options: {
//         port: 4001,
//         host: '0.0.0.0',
//       },
//     },
//   );
//   await app.listen();
// }
// bootstrap();
