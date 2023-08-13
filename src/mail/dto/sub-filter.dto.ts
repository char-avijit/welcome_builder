import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class SubFilterDto {

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    default: 1
  })
  pageNo?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    default: 10

  })
  limitPerPage?: number;
}
