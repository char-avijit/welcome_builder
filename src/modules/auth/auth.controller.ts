import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";
import { LoginDto } from "./dto/login.dto";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { LoginEntitie } from "./entities/login.entitie";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiCreatedResponse({ type: LoginEntitie })
  login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login();
  }
}
