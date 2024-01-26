import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    console.log(req.headers);

    const accessToken = req.headers.authorization?.split(' ')[1] as string;

    if (!accessToken) {
      throw new UnauthorizedException('Please login to access this resource!');
    }

    if (accessToken) {
      const decoded = this.jwtService.decode(accessToken);
      if (!decoded) {
        throw new UnauthorizedException(
          'Please login to access this resource!',
        );
      }
      const user = await this.prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });
      req.user = user;
      // Check for roles
      const roles = this.getRolesFromHandler(context);
      if (
        roles.length > 0 &&
        !roles.some((role) => user?.role?.includes(role))
      ) {
        throw new UnauthorizedException('Insufficient permissions!');
      }
    }

    return true;
  }

  private getRolesFromHandler(context: ExecutionContext): string[] {
    return Reflect.getMetadata(ROLES_KEY, context.getHandler()) || [];
  }
}
