import { Injectable } from "@nestjs/common";
import { CreateTestimonialDto } from "./dto/create-testimonial.dto";
import { UpdateTestimonialDto } from "./dto/update-testimonial.dto";
import { PrismaService } from "../../common/prisma/prisma.service";
import { FiltersDto } from "../../common/dto/filters.dto";
import { TestimonialEntity } from "./entities/testimonial.entity";
import { FileService } from "../file/file.service";
import { TestimonialsEntity } from "./entities/testimonials.entity";
import * as process from "process";

@Injectable()
export class TestimonialService {
  constructor(private prisma: PrismaService, private fileService: FileService) {
  }

  async create(arg: { createTestimonialDto: CreateTestimonialDto, }): Promise<TestimonialEntity> {
    const { createTestimonialDto } = arg;
    return this.prisma.testimonials.create({
      data: {
        message: createTestimonialDto.message,
        name: createTestimonialDto.name,
        designation: createTestimonialDto.designation,
        avatar: `${process.env.HOST}/file/${createTestimonialDto.avatar}`,
        avatarImageKey: createTestimonialDto.avatarImageKey
      }
    });
  }

  async findAll(filtersDto?: FiltersDto): Promise<TestimonialsEntity> {
    let pageNo = filtersDto.pageNo ?? 1;
    if (pageNo == 0) {
      pageNo = 1;
    }
    const limitPerPage = filtersDto.limitPerPage ?? 10;
    const skip = (pageNo - 1) * limitPerPage;
    const data = await this.prisma.testimonials.findMany({
      skip,
      take: parseInt(String(limitPerPage)),
      orderBy: [
        {
          id: "desc"
        },
        {
          name: "desc"
        }
      ]
    }).then(data => data);
    const count = await this.prisma.testimonials.count();
    return ({
      count,
      results: data
    });
  }

  async findOne(id: number): Promise<TestimonialEntity> {
    return this.prisma.testimonials.findFirst({
      where: {
        id
      }
    });
  }

  async update(id: number, updateTestimonialDto: UpdateTestimonialDto): Promise<TestimonialEntity> {
    return this.prisma.testimonials.update({
      where: {
        id
      }, data: {
        message: updateTestimonialDto.message,
        name: updateTestimonialDto.name,
        designation: updateTestimonialDto.designation,
        avatar: `${process.env.HOST}/file/${updateTestimonialDto.avatar}`,
        avatarImageKey: updateTestimonialDto.avatarImageKey
      }
    });
  }

  async remove(id: number): Promise<TestimonialEntity> {
    return this.prisma.testimonials.delete({
      where: {
        id
      }
    });
  }
}
