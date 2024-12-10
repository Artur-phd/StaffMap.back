import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointsEntity } from '../entities';
import { Repository } from 'typeorm';
import { PointDto } from 'src/api/product/dtos';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(PointsEntity)
    private readonly pointsRepository: Repository<PointsEntity>,
  ) {}

  public async getPointsWithUserIdOnly(): Promise<any[]> {
    return await this.pointsRepository
      .createQueryBuilder('points')
      .leftJoin('points.user', 'user')
      .addSelect('user.id')
      .getMany();
  }

  public async getPointsIsMy(): Promise<PointsEntity[]> {
    return await this.pointsRepository.find({
      order: { title: 'ASC' },
      select: {
        user: { id: true },
        title: true,
        moneyRate: true,
        minStaff: true,
        maxStaff: true,
        workHours: true,
        address: true,
      },
    });
  }

  public async addPoint(payload): Promise<void> {
    const { title, user } = payload;
    const checkCloneByTitle = await this.pointsRepository.findOneBy({
      title,
      user: { id: user },
    });
    if (checkCloneByTitle) {
      throw new BadRequestException('Пункт с таким названием уже существует');
    }
    const newPoint = this.pointsRepository.create(payload);
    await this.pointsRepository.insert(newPoint);
    throw new HttpException('Completed', 201);
  }

  public async deletePointById(id: string, userId: string): Promise<void> {
    const deletedElement = await this.pointsRepository.delete({
      id,
      user: { id: userId },
    });
    if (!deletedElement.affected) {
      throw new BadRequestException('Ошибка при удалении');
    }
    throw new HttpException('Completed', 204);
  }

  public async editById(
    payload: PointDto,
    pointId: string,
    userId: string,
  ): Promise<void> {
    const editedPoint = this.pointsRepository.create(payload);
    const edited = await this.pointsRepository.update(
      { id: pointId, user: { id: userId } },
      editedPoint,
    );
    if (!edited.affected) {
      throw new BadRequestException(
        'Ошибка, возможно указан неверный id пункта',
      );
    }
    throw new HttpException('Edited', 201);
  }
}
