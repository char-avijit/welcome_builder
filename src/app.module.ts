import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./common/prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TestimonialModule } from "./modules/testimonial/testimonial.module";
import { MailModule } from "./modules/mail/mail.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { FileModule } from './modules/file/file.module';
import * as process from "process";


@Module({
  imports: [PrismaModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), TestimonialModule, MailModule, MailerModule.forRoot({
    transport: process.env.SMTP,
    defaults: {
      from: "\"No Reply\" <noreply@example.com>"
    },
    template: {
      dir: process.cwd() + "/src/mail-templates",
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true
      }
    }
  }), FileModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
