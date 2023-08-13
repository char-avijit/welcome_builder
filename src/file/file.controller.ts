import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateFileDto } from "./dto/create-file.dto";
import { ApiAcceptedResponse, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { UploadFileEntity } from "./entities/file.entity";
import * as stream from "stream";

@ApiTags("File")
@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  @ApiAcceptedResponse({ type: UploadFileEntity })
  upload(@Body() data: CreateFileDto, @UploadedFile() file: Express.Multer.File) {
    return this.fileService.upload(file);
  }

  @Get(":key")
  @ApiAcceptedResponse({ type: stream.Readable })
  findOne(@Param("key") key: string) {
    return this.fileService.findOne(key);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.fileService.remove(+id);
  }
}
