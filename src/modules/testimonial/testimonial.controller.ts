import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { TestimonialService } from "./testimonial.service";
import { CreateTestimonialDto } from "./dto/create-testimonial.dto";
import { UpdateTestimonialDto } from "./dto/update-testimonial.dto";
import { TestimonialsEntity } from "./entities/testimonials.entity";
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiDefaultResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TestimonialEntity } from "./entities/testimonial.entity";
import { PrismaClientExceptionFilter } from "../../common/prisma-client-exception/prisma-client-exception.filter";
import { FiltersDto } from "../../common/dto/filters.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Testimonial")
@Controller("testimonial")
@UseFilters(PrismaClientExceptionFilter)
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiCreatedResponse({ type: TestimonialEntity })
  @Post()
  create(@Body() createTestimonialDto: CreateTestimonialDto, @UploadedFile() file: Express.Multer.File) {
    return this.testimonialService.create({ createTestimonialDto, file });
  }

  @ApiDefaultResponse({ type: TestimonialsEntity })
  @Get()
  findAll(@Query() filtersDto?: FiltersDto) {
    return this.testimonialService.findAll(filtersDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.testimonialService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTestimonialDto: UpdateTestimonialDto) {
    return this.testimonialService.update(+id, updateTestimonialDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.testimonialService.remove(+id);
  }
}
