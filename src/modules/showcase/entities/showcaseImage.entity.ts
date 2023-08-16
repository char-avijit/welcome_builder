import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ShowcaseImageEntity {
  @IsString()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  key: string;

  @IsString()
  @ApiProperty()
  url: string;

}

/*
model ShowCaseImages {
  id         Int      @id @default(autoincrement())
  key        String
  showCase   ShowCase @relation(fields: [showCaseId], references: [id])
  showCaseId Int
}*/
