import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/core/users/entity';
import { TokenPayloadDto } from 'src/shared/dtos';

@Injectable()
export class TokenProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, UserEntity, TokenPayloadDto);
    };
  }
}
