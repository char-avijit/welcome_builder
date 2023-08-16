import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ShowcaseService } from "./showcase.service";
import { CreateShowcaseDto } from "./dto/create-showcase.dto";
import { UpdateShowcaseDto } from "./dto/update-showcase.dto";
import { ApiBearerAuth, ApiDefaultResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ShowcaseEntity } from "./entities/showcase.entity";
import { ShowCaseFiltersDto } from "./dto/showCaseFilters.dto";
import { ShowcasesEntity } from "./entities/showcases.entity";

@ApiTags("Showcase")
@Controller("showcase")
export class ShowcaseController {
  constructor(private readonly showcaseService: ShowcaseService) {
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createShowcaseDto: CreateShowcaseDto) {
    return this.showcaseService.create(createShowcaseDto);
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
