import { Injectable, Logger } from "@nestjs/common";
import * as process from "process";
import { JwtService } from "@nestjs/jwt";
import { LoginEntitie } from "./entities/login.entitie";

@Injectable()
export class AuthService {
  readonly #logger = new Logger(AuthService.name);

  constructor(private jwtService: JwtService) {
  }

  async validateUser(username: string, pass: string): Promise<boolean> {
    const name = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    if (username === name && password === pass) {
      this.#logger.log(`Login Success`)
      return true;
    }
    this.#logger.error(`wrong username or password`)
    return null;
  }

  async login(): Promise<LoginEntitie> {
    const payload = { name: "admin" };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
