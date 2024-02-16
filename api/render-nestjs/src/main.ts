import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

function checkEnvironment(configService: ConfigService) {
  const requiredEnvVars = [
    'ISSUER_BASE_URL',
    'AUDIENCE',
    'AUTH0_DOMAIN',
    // 'CLIENT_ORIGIN_URL', - can use this for CORS later
  ];

  requiredEnvVars.forEach((envVar) => {
    if (!configService.get<string>(envVar)) {
      throw Error(`Undefined environment variable: ${envVar}`);
    }
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  checkEnvironment(configService);
  await app.listen(3000);
}
bootstrap();
