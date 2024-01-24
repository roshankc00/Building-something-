import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaDb: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, password, phoneNumber } = registerDto;
    const isEmailAlreadyExist = await this.prismaDb.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailAlreadyExist) {
      throw new BadRequestException('User with this email elready exist');
    }

    const isPhoneNumberAlreadyExist = await this.prismaDb.user.findUnique({
      where: {
        phoneNumber,
      },
    });

    if (isPhoneNumberAlreadyExist) {
      throw new BadRequestException(
        'User with this phone number already exist',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prismaDb.user.create({
      data: {
        email,
        name,
        password,
        phoneNumber,
      },
    });

    return {
      success: true,
      message: 'user registered successfully',
      user: newUser,
    };
  }
}
