import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRECT,
    signOptions: { expiresIn: "7d" }
  })],
  exports: [AuthService]
})
export class AuthModule {
}
