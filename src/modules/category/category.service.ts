import {Injectable} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {PrismaService} from "../../common/prisma/prisma.service";
import {FiltersDto} from "../../common/dto/filters.dto";
import {CategoriesEntity} from "./entities/categories.entity";

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {
    }

    create(createCategoryDto: CreateCategoryDto) {
        return this.prisma.showCaseCategory.create({data: createCategoryDto});
    }

    async findAll(filtersDto?: FiltersDto): Promise<CategoriesEntity> {
        let pageNo = filtersDto.pageNo ?? 1
        if (pageNo == 0) {
            pageNo = 1
        }
        const limitPerPage = filtersDto.limitPerPage ?? 10
        const skip = (pageNo - 1) * limitPerPage
        const data = await this.prisma.showCaseCategory.findMany({
            skip,
            take: parseInt(String(limitPerPage))
        })
        const count = await this.prisma.showCaseCategory.count()
        return ({
            count,
            results: data
        })
    }

    findOne(id: number) {
        return `This action returns a #${id} category`;
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return `This action updates a #${id} category`;
    }

    remove(id: number) {
        return `This action removes a #${id} category`;
    }
}
