import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateFileDto } from "./dto/create-file.dto";
import { ApiAcceptedResponse, ApiBearerAuth, ApiConsumes, ApiDefaultResponse, ApiTags } from "@nestjs/swagger";
import { UploadFileEntity } from "./entities/file.entity";
import * as stream from "stream";
import { Readable } from "stream";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("File")
@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  @ApiAcceptedResponse({ type: UploadFileEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  upload(@Body() data: CreateFileDto, @UploadedFile() file: Express.Multer.File) {
    return this.fileService.upload(file);
  }

  @Get(":key")
  @ApiDefaultResponse({ type: stream.Readable })
  async findOne(@Param("key") key: string, @Response() res) {
    const gg = await this.fileService.findOne(key);
    res.setHeader("content-type", "application/octet-stream");

    gg.pipe(res);
  }

  @Delete(":key")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param("key") key: string) {
    return this.fileService.remove(key);
  }
}
