import { PassportStrategy } from '@nestjs/passport';
import { TokenPayloadDto } from 'src/shared/dtos';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/core/users/services';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromHeader('s-access-token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(
    payload: TokenPayloadDto & {
      iat: string;
      exp: string;
    },
  ): Promise<TokenPayloadDto> {
    const existingUser = await this.userService.findById(payload.id);
    if (!existingUser) {
      throw new UnauthorizedException('Пользователь не найден');
    }
    if (existingUser.isBlocked) {
      throw new ForbiddenException('Пользователь заблокирован');
    }
    delete payload.iat;
    delete payload.exp;
    return payload;
  }
}
