import { ApiProperty } from "@nestjs/swagger";

export class LoginEntitie {
  @ApiProperty()
  access_token: string;

}