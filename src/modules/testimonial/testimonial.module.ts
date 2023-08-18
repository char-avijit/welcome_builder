import { Module } from "@nestjs/common";
import { TestimonialService } from "./testimonial.service";
import { TestimonialController } from "./testimonial.controller";
import { PrismaService } from "../../common/prisma/prisma.service";
import { FileService } from "../file/file.service";

@Module({
  controllers: [TestimonialController],
  providers: [TestimonialService, PrismaService, FileService]
})
export class TestimonialModule {
}
