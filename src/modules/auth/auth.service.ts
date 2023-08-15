import { Injectable } from "@nestjs/common";
import * as process from "process";
import { JwtService } from "@nestjs/jwt";
import { LoginEntitie } from "./entities/login.entitie";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {
  }

  async validateUser(username: string, pass: string): Promise<boolean> {
    const name = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    if (username === name && password === pass) {
      return true;
    }
    return null;
  }

  async login(): Promise<LoginEntitie> {
    const payload = { name: "admin" };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
