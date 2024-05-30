import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import './common/extensions/index';
import { ValidationPipe } from '@nestjs/common';
import { Swagger } from './common/swagger/swagger';
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	Swagger.setup(app);
	app.enableCors({
		origin: '*',
	});
	await app.listen(3000);
}
bootstrap();
