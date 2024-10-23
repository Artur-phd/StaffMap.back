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

  public async getAllPoints(): Promise<PointsEntity[]> {
    return await this.pointsRepository.find({ order: { title: 'ASC' } });
  }

  public async addPoint(payload: PointDto): Promise<void> {
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
    return await this.pointsRepository.delete({ id });
  }
}
