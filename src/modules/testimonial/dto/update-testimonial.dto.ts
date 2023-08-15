import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTestimonialDto } from "./create-testimonial.dto";
import { IsString } from "class-validator";

export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {
  @IsString()
  @ApiProperty()
  message: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  designation: string;
}
