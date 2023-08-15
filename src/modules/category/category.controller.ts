import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {ApiBearerAuth, ApiCreatedResponse, ApiDefaultResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CategoryEntity} from "./entities/category.entity";
import {CategoriesEntity} from "./entities/categories.entity";
import {FiltersDto} from "../../common/dto/filters.dto";

@ApiTags("Category")
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({type: CategoryEntity})
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    @ApiDefaultResponse({type: CategoriesEntity})
    findAll(@Query() filtersDto?: FiltersDto) {
        return this.categoryService.findAll(filtersDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(+id, updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoryService.remove(+id);
    }
}
