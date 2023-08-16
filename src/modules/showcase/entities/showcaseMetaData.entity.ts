import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ShowcaseMetaDataEntity {
  @IsString()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  @IsOptional()
  keywords?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  description?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  ogImage?: string;

}

/*
model ShowCaseMetaData {
  id          Int      @id @default(autoincrement())
  showCase    ShowCase @relation(fields: [showCaseId], references: [id])
  showCaseId  Int      @unique
  keywords    String?  @db.Text
  description String?  @db.Text
  ogImage     String?
}

}*/
