import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { ShowcaseMetaDataDto } from "./showcaseMetaData.dto";

export class CreateShowcaseDto {
  @ApiProperty({ type: ["file"], format: "binary", required: true })
  files: Array<Express.Multer.File>;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty(
    {
      required: false
    }
  )
  @IsOptional()
  address?: string;

  @IsString()
  @ApiProperty(
    {
      required: false
    }
  )
  @IsOptional()
  latitude?: string;

  @IsString()
  @ApiProperty(
    {
      required: false
    }
  )
  @IsOptional()
  longitude?: string;

  @IsString()
  @ApiProperty(
    {

    }
  )
  description: string;

  @IsString()
  @ApiProperty()
  type: string;


  @IsString()
  @ApiProperty(
    {
      type: ShowcaseMetaDataDto,
      required: false

    }
  )
  @IsOptional()
  metadata?: ShowcaseMetaDataDto;

  @IsString()
  @ApiProperty()
  categoryId: number;
}
