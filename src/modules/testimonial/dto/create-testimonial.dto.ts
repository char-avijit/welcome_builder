import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTestimonialDto {
  @IsString()
  @ApiProperty()
  message: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  designation: string;
  @ApiProperty({ type: "string", format: "binary", required: true })
  avatar: Express.Multer.File;
}
