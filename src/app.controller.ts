import {Controller, Get} from "@nestjs/common";
import {AppService} from "./app.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Home")
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    async getHello(): Promise<any> {
        const data = await this.appService.getHello();
        if (data) {
            return (`<div style="font-size: 10px;margin: auto;
        border: 3px solid #E8E8E8;
        display:flex;
        justify-content: center;
        background-color: #F5F5F5;
        padding: 10px; "><pre>${data} </pre></div>`);
        } else {
            return (`<div style="font-size: 10px;margin: auto;
        border: 3px solid #E8E8E8;
        display:flex;
        justify-content: center;
        background-color: #F5F5F5;
        padding: 10px; "><pre>ishaf </pre></div>`);
        }

    }
}
