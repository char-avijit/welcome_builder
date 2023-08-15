import { Injectable } from "@nestjs/common";
import { SendMailDto } from "./dto/send-mail.dto";
import { SubscribeMailDto } from "./dto/subscribe-mail.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { PrismaService } from "../../common/prisma/prisma.service";
import { SubFilterDto } from "./dto/sub-filter.dto";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService, private prisma: PrismaService) {
  }

  async subscribe(subscribeMailDto: SubscribeMailDto) {
    await this.prisma.subscribers.create({
      data: {
        email: subscribeMailDto.email
      }
    });
  }

  async getSubscribers(subFilterDto: SubFilterDto) {
    let pageNo = subFilterDto.pageNo ?? 1;
    if (pageNo == 0) {
      pageNo = 1;
    }
    const limitPerPage = subFilterDto.limitPerPage ?? 10;
    const skip = (pageNo - 1) * limitPerPage;
    const data = await this.prisma.subscribers.findMany({
      skip,
      take: parseInt(String(limitPerPage))
    });
    const count = await this.prisma.subscribers.count();
    return ({
      count,
      data
    });
  }

  async sendMail(sendMailDto: SendMailDto) {
    await this.prisma.subscribers.create({
      data: {
        email: sendMailDto.email,
        name: sendMailDto.name
      }
    });
    await this.mailerService
      .sendMail({
        to: "admin@ishaf.info",
        from: "no-reply@ishaf.info",
        subject: sendMailDto.subject,
        template: "someOneNeedToContact",
        context: sendMailDto
      });
    return "This action adds a new mail";
  }
}
