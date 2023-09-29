import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger as LoggerClass, ValidationPipe } from "@nestjs/common";
import * as process from "process";
import * as helmet from "helmet";
import { greenBright } from "cli-color";

const logger = new LoggerClass("Bootstrap");
const PORT = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000;


(async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet.default({crossOriginResourcePolicy: false,}));
  app.enableCors({ origin: true });
  app.enableCors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle("Welcome Build")
    .setDescription("Welcome Build backend api docs")
    .setVersion("0.1")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(PORT);

  logger.log(`🚀🚀 Started Server 🚀🚀 at PORT ${greenBright(PORT)}`);
  logger.log(`http://localhost:${PORT}`);
})();
