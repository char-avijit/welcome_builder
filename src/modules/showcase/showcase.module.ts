import {Module} from '@nestjs/common';
import {ShowcaseService} from './showcase.service';
import {ShowcaseController} from './showcase.controller';
import {PrismaService} from "../../common/prisma/prisma.service";

@Module({
    controllers: [ShowcaseController],
    providers: [ShowcaseService, PrismaService]
})
export class ShowcaseModule {
}
