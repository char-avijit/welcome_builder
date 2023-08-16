import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsInt} from "class-validator";
import {ShowcaseEntity} from "./showcase.entity";

export class ShowcasesEntity {

    @IsInt()
    @ApiProperty()
    count: number;


    @IsArray()
    @ApiProperty({
        type: [ShowcaseEntity]
    })
    results: ShowcaseEntity[];
}