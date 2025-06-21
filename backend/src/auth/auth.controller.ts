import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LogDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/decorator.public';

@Controller('api/auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Public()
  @Post('signup')
  async signIn(
    @Body(new ValidationPipe()) signInDto: LogDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, ...rest } = await this.AuthService.signIn(signInDto);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600 * 1000,
    });

    // you also can set in header
    // res.setHeader('Authorization', `Bearer ${accessToken}`);

    return rest;
  }

  @Public()
  @Post('login')
  async login(
    @Body(new ValidationPipe()) loginDto: LogDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, message } = await this.AuthService.login(loginDto);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    //you can set header like this
    // res.setHeader('Authorization', `Bearer ${accessToken}`);
    // console.log(accessToken);

    return message;
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
  }
}
