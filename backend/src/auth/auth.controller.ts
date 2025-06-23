import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { LogDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { Public } from './decorators/decorator.public';

@Controller('api/auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Get('check')
  getProfile(@Req() req: Request) {
    return {
      username: req.user,
      message: 'Authenticated',
    };
  }

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
    const { accessToken, ...rest } = await this.AuthService.login(loginDto);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    //you can set header like this
    // res.setHeader('Authorization', `Bearer ${accessToken}`);
    // console.log(accessToken);

    return rest;
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');
  }
}
