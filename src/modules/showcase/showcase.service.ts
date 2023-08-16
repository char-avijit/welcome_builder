import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateShowcaseDto } from "./dto/create-showcase.dto";
import { UpdateShowcaseDto } from "./dto/update-showcase.dto";
import { PrismaService } from "../../common/prisma/prisma.service";
import { ShowCaseFiltersDto } from "./dto/showCaseFilters.dto";
import { ShowcasesEntity } from "./entities/showcases.entity";
import { ShowcaseEntity } from "./entities/showcase.entity";
import { ShowcaseImageEntity } from "./entities/showcaseImage.entity";

@Injectable()
export class ShowcaseService {
  constructor(private prisma: PrismaService) {
  }

  create(createShowcaseDto: CreateShowcaseDto) {
    return "This action adds a new showcase";
  }

  async findAll(showCaseFiltersDto?: ShowCaseFiltersDto): Promise<ShowcasesEntity> {
    let pageNo = showCaseFiltersDto.pageNo ?? 1;
    if (pageNo == 0) {
      pageNo = 1;
    }
    const limitPerPage = showCaseFiltersDto.limitPerPage ?? 10;
    const skip = (pageNo - 1) * limitPerPage;
    const showCases = await this.prisma.showCase.findMany({
      skip,
      take: parseInt(String(limitPerPage)),
      where: !isNaN(Number(showCaseFiltersDto.categoryId)) ? {
        CategoryId: Number(showCaseFiltersDto.categoryId)
      } : {}
    });
    const count = await this.prisma.showCase.count({
      where: !isNaN(Number(showCaseFiltersDto.categoryId)) ? {
        CategoryId: Number(showCaseFiltersDto.categoryId)
      } : {}
    });
    const resData: ShowcaseEntity[] = [];
    for (const value of showCases) {
      resData.push(
        await this.#geShowcaseEntity(value)
      );
    }
    return ({
      count,
      results: resData
    });
  }

  async findOne(id: any) {
    try {
      let showCase;
      if (Number(id)) {
        showCase = await this.prisma.showCase.findFirst({
          where: {
            id: Number(id)
          }
        }).then(showCase => showCase);
      } else {
        showCase = await this.prisma.showCase.findFirst({
          where: {
            slug: id
          }
        }).then(showCase => showCase);
      }
      return this.#geShowcaseEntity(showCase);
    } catch (e) {
      throw new BadRequestException(e);
    }

  }

  async #geShowcaseEntity(showCase) {
    if(showCase){
      const imagesData = await this.prisma.showCaseImages.findMany({
        where: {
          showCaseId: showCase.id
        }
      });
      const images: ShowcaseImageEntity[] = [];
      imagesData.forEach(
        image => {
          images.push(
            {
              key: image.key,
              id: image.id,
              url: `http://localhost:3000/file/${image.key}`
            }
          );
        }
      );

      const category = await this.prisma.showCaseCategory.findFirst({
        where: {
          id: showCase.CategoryId
        }
      }).then(category => category);
      const metaData = await this.prisma.showCaseMetaData.findFirst({
        where: {
          showCaseId: showCase.id
        }
      }).then(metaData => metaData);
      return {
        id: showCase.id,
        name: showCase.name,
        slug: showCase.slug,
        address: showCase.address,
        latitude: showCase.latitude,
        longitude: showCase.longitude,
        description: showCase.description,
        type: showCase.type,
        images: images,
        metadata: metaData,
        showCaseCategory: category
      };
    }else {
      throw new BadRequestException();
    }
  }

  update(id: number, updateShowcaseDto: UpdateShowcaseDto) {
    return `This action updates a #${id} showcase`;
  }

  remove(id: number) {
    return `This action removes a #${id} showcase`;
  }
}
