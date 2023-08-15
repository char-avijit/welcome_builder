import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SendMailDto {

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  subject: string;

  @IsString()
  @ApiProperty()
  message: string;
}
