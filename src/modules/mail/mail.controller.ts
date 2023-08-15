import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { MailService } from "./mail.service";
import { ApiAcceptedResponse, ApiDefaultResponse, ApiTags } from "@nestjs/swagger";
import { SubscribeMailDto } from "./dto/subscribe-mail.dto";
import { SendMailDto } from "./dto/send-mail.dto";
import { SubFilterDto } from "./dto/sub-filter.dto";
import { SubscribersEntity } from "./entities/subscribers.entity";

@ApiTags("Mail")
@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {
  }

  @Post("subscribe")
  @ApiAcceptedResponse()
  subscribe(@Body() subscribeMailDto: SubscribeMailDto) {
    return this.mailService.subscribe(subscribeMailDto);
  }

  @Get("subscribe")
  @ApiDefaultResponse({ type: SubscribersEntity })
  getSubscribers(@Query() subFilterDto?: SubFilterDto) {
    return this.mailService.getSubscribers(subFilterDto);
  }

  @Post("send")
  @ApiAcceptedResponse()
  sendMail(@Body() sendMailDto: SendMailDto) {
    return this.mailService.sendMail(sendMailDto);
  }

}
