import { ApiProperty } from "@nestjs/swagger";

export class CreateFileDto {
  @ApiProperty({ type: "string", format: "binary", required: true })
  file: Express.Multer.File;
}
