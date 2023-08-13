import { Injectable } from "@nestjs/common";
/* eslint-disable no-console */
var figlet = require("figlet");

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    let figletData: any = "";
    await figlet("ishaf", {
      font: "Doh"
    }, (err: any, data: any) => {
      figletData = data;
    });
    if (figletData !='') {
      return figletData;
    }

  }
}
