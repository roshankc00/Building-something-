import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { LoginDto, RegisterDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { AuthTokenService } from 'src/utils/tokenService';

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
        password: hashedPassword,
        phoneNumber,
      },
    });

    return {
      success: true,
      message: 'user registered successfully',
      user: newUser,
    };
  }

  async login(loginDto: LoginDto, response: Response) {
    const { email, password } = loginDto;
    const userExists = await this.prismaDb.user.findUnique({
      where: {
        email,
      },
    });
    if (!userExists) {
      throw new BadRequestException('User with this email doesnt exist');
    }

    const isPasswordvalid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordvalid) {
      throw new BadRequestException('Please enter the valid password');
    }

    const { accessToken } = new AuthTokenService(
      this.jwtService,
      this.configService,
    ).sendToken(userExists);
    return { accessToken, message: 'User logedIn Successfully', success: true };
  }

  async getSingleUser(id: string) {
    return await this.prismaDb.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllUser() {
    return this.prismaDb.user.findMany({});
  }
}
