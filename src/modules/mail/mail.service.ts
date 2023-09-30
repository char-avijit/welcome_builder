import { BadRequestException, Injectable } from "@nestjs/common";
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
    const exist = await this.prisma.subscribers.findUnique({
      where: {
        email: subscribeMailDto.email
      }
    });
    if (!exist) {
      return this.prisma.subscribers.create({
        data: {
          email: subscribeMailDto.email
        }
      });
    }else {
      return ({
        "status":"success"
      });
    }
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
    const exist = await this.prisma.subscribers.findUnique({
      where: {
        email: sendMailDto.email
      }
    });
    if (!exist) {
      await this.prisma.subscribers.create({
        data: {
          email: sendMailDto.email,
          name: sendMailDto.name
        }
      });
    }
    await this.mailerService
      .sendMail({
        to: sendMailDto.email,
        from: "no-reply@ishaf.info",
        subject: sendMailDto.subject,
        template: "someOneNeedToContact",
        context: sendMailDto
      });
    return ({
      "status":"success"
    });
  }
}
