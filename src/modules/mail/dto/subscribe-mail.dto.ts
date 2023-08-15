import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SubscribeMailDto {
  @IsString()
  @ApiProperty()
  email: string;
}
