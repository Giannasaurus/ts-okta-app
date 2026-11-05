import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ApplicationModule } from './application.module'

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule)
    app.useGlobalPipes(new ValidationPipe())
    
    const swaggerOptions = new DocumentBuilder().build()
    const document = SwaggerModule.createDocument(app, swaggerOptions)
    SwaggerModule.setup('/', app, document)
    
    await app.listen(3000)
}

bootstrap().catch(console.error)