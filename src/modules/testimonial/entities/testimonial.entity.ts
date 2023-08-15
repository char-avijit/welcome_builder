import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TestimonialEntity {
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
