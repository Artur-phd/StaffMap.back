import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from 'src/shared/dtos';

@Injectable()
export class JwtHelper {
  constructor(private jwtService: JwtService) {}

  public async create(payload: TokenPayloadDto) {
    const token = await this.jwtService.signAsync({ ...payload });
    return token;
  }

  public async verify(token: string) {
    return this.jwtService.decode<TokenPayloadDto>(token);
  }
}
