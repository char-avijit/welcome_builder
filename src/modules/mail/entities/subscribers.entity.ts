import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt } from "class-validator";
import { SubscriberEntity } from "./subscriber.entity";

export class SubscribersEntity {

  @IsInt()
  @ApiProperty()
  count: number;


  @IsArray()
  @ApiProperty({
    type: [SubscriberEntity]
  })
  results: SubscriberEntity[];
}