import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { ShowcaseMetaDataDto } from "./showcaseMetaData.dto";
import { AreaUnit, Currency, PropertyType } from "../../../common/helper/enum";


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
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  price: number;

  @IsString()
  @ApiProperty({
    enum: Currency,
    isArray: false,
    default: Currency.AUD,
    example: [Currency.USD, Currency.AUD]
  })
  currency: string;

  @IsString()
  @ApiProperty()
  area: number;

  @IsString()
  @ApiProperty({
    enum: AreaUnit,
    isArray: false,
    default: AreaUnit.SQUARE_FEET,
    example: [AreaUnit.SQUARE_FEET, AreaUnit.SQUARE_METERS]
  })
  areaUnit: string;

  @IsString()
  @ApiProperty({
    enum: PropertyType,
    isArray: false,
    example: [PropertyType.HOUSE, PropertyType.ROOM, PropertyType.APARTMENT, PropertyType.TOWN_HOUSE]
  })
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
