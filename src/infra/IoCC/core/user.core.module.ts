import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntities, userExports, userServices } from 'src/core/users';

@Module({
  imports: [TypeOrmModule.forFeature(userEntities)],
  providers: userServices,
  exports: userExports,
})
export class UserCoreModule {}
