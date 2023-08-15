import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetFileDto {
  @ApiProperty()
  @IsString()
  key: string;
}