import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/users/entity';
import { Repository } from 'typeorm';

@Injectable()
export class IsUserActiveGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    if (!userId) {
      throw new ForbiddenException('User not authenticated');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['points'],
    });

    if (!user || !user.point) {
      throw new ForbiddenException('No points found for the user');
    }

    const hasAccess = user.point.some((point) => point.isTrailEnd);

    if (!hasAccess) {
      throw new ForbiddenException('Access denied: no valid trail end');
    }

    return true;
  }
}
