import { Module } from "@nestjs/common";
import { ShowcaseService } from "./showcase.service";
import { ShowcaseController } from "./showcase.controller";
import { PrismaService } from "../../common/prisma/prisma.service";
import { FileService } from "../file/file.service";

@Module({
  controllers: [ShowcaseController],
  providers: [ShowcaseService, PrismaService, FileService]
})
export class ShowcaseModule {
}
