import {Injectable} from '@nestjs/common';
import {CreateTestimonialDto} from './dto/create-testimonial.dto';
import {UpdateTestimonialDto} from './dto/update-testimonial.dto';
import {PrismaService} from "../../common/prisma/prisma.service";
import {FiltersDto} from "../../common/dto/filters.dto";

@Injectable()
export class TestimonialService {
    constructor(private prisma: PrismaService) {
    }

    create(createTestimonialDto: CreateTestimonialDto) {
        return this.prisma.testimonials.create({data: createTestimonialDto});
    }

    async findAll(filtersDto?: FiltersDto) {
        let pageNo = filtersDto.pageNo ?? 1
        if (pageNo == 0) {
            pageNo = 1
        }
        const limitPerPage = filtersDto.limitPerPage ?? 10
        const skip = (pageNo - 1) * limitPerPage
        const data = await this.prisma.testimonials.findMany({
            skip,
            take: parseInt(String(limitPerPage))
        })
        const count = await this.prisma.testimonials.count()
        return ({
            count,
            data
        })
    }

    findOne(id: number) {
        return this.prisma.testimonials.findFirst({
            where: {
                id
            }
        });
    }

    update(id: number, updateTestimonialDto: UpdateTestimonialDto) {
        return this.prisma.testimonials.update({
            where: {
                id
            }, data: {
                message: updateTestimonialDto.message,
                name: updateTestimonialDto.name,
                designation: updateTestimonialDto.designation,
            }
        });
    }

    remove(id: number) {
        return this.prisma.testimonials.delete({
            where: {
                id
            }
        });
    }
}
