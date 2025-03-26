import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { Public } from 'src/decorators/Public.decorator';
import { ResponseDTO } from 'src/DTO/response.dto';
import { UserDocument } from 'src/user/schemas/User.chema';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './DTO/LoginResponseDto.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

interface LoginRequest extends ExpressRequest {
  user: UserDocument;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/login')
  async login(@Request() req: LoginRequest): Promise<ResponseDTO<LoginResponseDto>> {
    const user = req.user;
    const token = await this.authService.login(user);
    return new ResponseDTO(token);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/logout')
  async logout(@Request() req) {
    return req.logout();
  }

  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
