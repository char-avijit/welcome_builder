import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ShowcaseService } from "./showcase.service";
import { CreateShowcaseDto } from "./dto/create-showcase.dto";
import { UpdateShowcaseDto } from "./dto/update-showcase.dto";
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiDefaultResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ShowcaseEntity } from "./entities/showcase.entity";
import { ShowCaseFiltersDto } from "./dto/showCaseFilters.dto";
import { ShowcasesEntity } from "./entities/showcases.entity";
import { FilesInterceptor } from "@nestjs/platform-express";
import { imageUploadOptions } from "../../common/helper/imageFileUpload.helper";

@ApiTags("Showcase")
@Controller("showcase")
export class ShowcaseController {
  constructor(private readonly showcaseService: ShowcaseService) {
  }

  @Post()
  @ApiConsumes("multipart/form-data", "application/json")
  @UseInterceptors(FilesInterceptor("files", 20, imageUploadOptions))
  @ApiCreatedResponse({ type: ShowcaseEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createShowcaseDto: CreateShowcaseDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.showcaseService.create({ createShowcaseDto, files });
  }

  @Get()
  @ApiDefaultResponse({ type: ShowcasesEntity })
  findAll(@Query() showCaseFiltersDto?: ShowCaseFiltersDto) {
    return this.showcaseService.findAll(showCaseFiltersDto);
  }

  @Get([":id", ":slug"])
  @ApiDefaultResponse({ type: ShowcaseEntity })
  findOne(@Param("id/slug") id: string) {
    return this.showcaseService.findOne(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() updateShowcaseDto: UpdateShowcaseDto) {
    return this.showcaseService.update(+id, updateShowcaseDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.showcaseService.remove(+id);
  }
}
