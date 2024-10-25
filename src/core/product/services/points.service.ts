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

  public async getPointsIsMy(id: string): Promise<PointsEntity[]> {
    return await this.pointsRepository.find({
      order: { title: 'ASC' },
      where: { user: { id } },
      select: {
        id: true,
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
    const { title } = payload;
    const checkCloneByTitle = await this.pointsRepository.findOneBy({
      title,
    });
    if (checkCloneByTitle) {
      throw new BadRequestException('Пункт с таким названием уже существует');
    }
    const newPoint = this.pointsRepository.create(payload);
    await this.pointsRepository.insert(newPoint);
    throw new HttpException('Completed', 201);
  }

  public async deletePointById(id: string) {
    const deletedElement = await this.pointsRepository.delete({ id });
    if (deletedElement.affected === 0) {
      throw new BadRequestException('Ошибка при удалении');
    }
    throw new HttpException('Completed', 204);
  }

  public async editById(payload: PointDto, id: string) {
    const editedPoint = this.pointsRepository.create(payload);
    await this.pointsRepository.update(id, editedPoint);
    throw new HttpException('Edited', 201);
  }
}
