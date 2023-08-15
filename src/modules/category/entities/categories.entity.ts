import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsInt} from "class-validator";
import {CategoryEntity} from "./category.entity";

export class CategoriesEntity {

    @IsInt()
    @ApiProperty()
    count: number;


    @IsArray()
    @ApiProperty({
        type: [CategoryEntity]
    })
    results: CategoryEntity[];
}