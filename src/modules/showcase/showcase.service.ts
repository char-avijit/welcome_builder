import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateShowcaseDto } from "./dto/create-showcase.dto";
import { UpdateShowcaseDto } from "./dto/update-showcase.dto";
import { PrismaService } from "../../common/prisma/prisma.service";
import { ShowCaseFiltersDto } from "./dto/showCaseFilters.dto";
import { ShowcasesEntity } from "./entities/showcases.entity";
import { ShowcaseEntity } from "./entities/showcase.entity";
import { ShowcaseImageEntity } from "./entities/showcaseImage.entity";
import { FileService } from "../file/file.service";
import * as urlSlug from "url-slug";

@Injectable()
export class ShowcaseService {
  constructor(private prisma: PrismaService, private fileService: FileService) {
  }

  async create(arg: { createShowcaseDto: CreateShowcaseDto, files: Array<Express.Multer.File> }): Promise<ShowcaseEntity> {
    const { createShowcaseDto, files } = arg;

    const initShowCase = await this.prisma.showCase.create({
      data: {
        type: createShowcaseDto.type,
        CategoryId: Number(createShowcaseDto.categoryId),
        name: createShowcaseDto.name,
        slug: urlSlug.convert(`${createShowcaseDto.name} ${this.#generateString(5)}`, {
          transformer: urlSlug.LOWERCASE_TRANSFORMER
        }),
        address: createShowcaseDto.address,
        latitude: createShowcaseDto.latitude,
        longitude: createShowcaseDto.longitude,
        description: createShowcaseDto.description,
        area: createShowcaseDto.area,
        areaUnit: createShowcaseDto.areaUnit,
        currency: createShowcaseDto.currency,
        price: createShowcaseDto.price
      }
    }).then(initShowCase => initShowCase);

    const images: ShowcaseImageEntity[] = [];

    for (const file of files) {
      const uploadRes = await this.fileService.upload(file);

      const image = await this.prisma.showCaseImages.create({
        data: {
          key: uploadRes.key,
          showCaseId: initShowCase.id
        }
      }).then(image => image);

      images.push({
        key: uploadRes.key,
        url: `http://localhost:3000/file/${uploadRes.key}`,
        id: image.id
      });
    }
    const category = await this.prisma.showCaseCategory.findFirst({
      where: {
        id: +createShowcaseDto.categoryId
      }
    }).then(category => category);
    const metaData = await this.prisma.showCaseMetaData.create({
      data: {
        showCaseId: initShowCase.id,
        description: createShowcaseDto.metadata.description,
        keywords: createShowcaseDto.metadata.keywords
      }
    }).then(metaData => metaData);
    return {
      address: initShowCase.address,
      description: initShowCase.description,
      id: initShowCase.id,
      images: images,
      latitude: initShowCase.latitude,
      longitude: initShowCase.longitude,
      metadata: metaData,
      name: initShowCase.name,
      showCaseCategory: category,
      slug: initShowCase.slug,
      type: initShowCase.type,
      area: initShowCase.area,
      areaUnit: initShowCase.areaUnit,
      currency: initShowCase.currency,
      price: initShowCase.price
    };
  }

  #generateString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
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
        await this.#getShowcaseEntity(value)
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
      return this.#getShowcaseEntity(showCase);
    } catch (e) {
      throw new BadRequestException(e);
    }

  }

  async #getShowcaseEntity(showCase): Promise<ShowcaseEntity> {
    if (showCase) {
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
        showCaseCategory: category,
        area: showCase.area,
        areaUnit: showCase.areaUnit,
        price: showCase.price,
        currency: showCase.currency
      };
    } else {
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
