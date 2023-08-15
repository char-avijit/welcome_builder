import {IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CategoryEntity {
    @IsString()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    description?: string;
}
