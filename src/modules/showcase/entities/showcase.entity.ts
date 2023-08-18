import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ShowcaseImageEntity } from "./showcaseImage.entity";
import { ShowcaseMetaDataEntity } from "./showcaseMetaData.entity";
import { CategoryEntity } from "../../category/entities/category.entity";
import { AreaUnit, Currency, PropertyType } from "../../../common/helper/enum";

export class ShowcaseEntity {
  @IsString()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  slug: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  address?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  latitude?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  longitude?: string;

  @IsString()
  @ApiProperty()
  price: number;

  @IsString()
  @ApiProperty(
    {
      enum: Currency
    }
  )
  currency: string;

  @IsString()
  @ApiProperty()
  area: number;

  @IsString()
  @ApiProperty({
    enum: AreaUnit
  })
  areaUnit: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty(
    {
      enum: PropertyType
    }
  )
  type: string;

  @IsString()
  @ApiProperty({
    type: [ShowcaseImageEntity]
  })
  @IsOptional()
  images?: ShowcaseImageEntity[];

  @IsString()
  @ApiProperty(
    {
      type: ShowcaseMetaDataEntity
    }
  )
  @IsOptional()
  metadata?: ShowcaseMetaDataEntity;

  @IsString()
  @ApiProperty(
    {
      type: CategoryEntity
    }
  )
  @IsOptional()
  showCaseCategory?: CategoryEntity;
}

