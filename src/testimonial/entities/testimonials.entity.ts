import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt } from "class-validator";
import { TestimonialEntity } from "./testimonial.entity";

export class TestimonialsEntity {

  @IsInt()
  @ApiProperty()
  count: number;


  @IsArray()
  @ApiProperty({
    type: [TestimonialEntity]
  })
  results: TestimonialEntity[];
}