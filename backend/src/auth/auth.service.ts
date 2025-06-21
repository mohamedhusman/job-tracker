import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/schemas/user.schema';
import { LogDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(
    signDto: LogDto,
  ): Promise<{ accessToken: string; message: string; username: string }> {
    try {
      const existUser = await this.UserModel.findOne({
        username: signDto.username,
      });

      if (existUser) {
        console.log(existUser);
        throw new ConflictException('username already exists!');
      }
      //password hashing
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(signDto.password, salt);

      const newUser = new this.UserModel({
        username: signDto.username,
        password: hash,
      });
      await newUser.save();
      const payload = { sub: newUser._id, username: newUser.username };
      const { username, ...rest } = newUser;

      return {
        accessToken: await this.jwtService.signAsync(payload),
        message: 'login successful',
        username: username,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException({
        message:
          'something went wrong in creating your account please try again!',
      });
    }
  }

  async login(logdto: LogDto) {
    try {
      const userExist = await this.UserModel.findOne({
        username: logdto.username,
      });

      if (!userExist) {
        throw new BadRequestException('wrong username or password');
      }
      const comparePss = bcrypt.compareSync(
        logdto.password,
        userExist.password,
      );
      if (!comparePss) {
        throw new BadRequestException('wrong username or password');
      }

      const payload = { sub: userExist._id, username: userExist.username };
      const accessToken = await this.jwtService.signAsync(payload);

      return {
        accessToken,
        message: 'login success!',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new error({ message: 'something went wrong!' });
    }
  }

  // //user validate function
  // async validateUser(userField: LogDto) {
  //   const user = await this.UserModel.findOne({ username: userField.username });

  //   if (user && user.password == userField.password) {
  //     return user;
  //   }
  //   return null;
  // }
}
