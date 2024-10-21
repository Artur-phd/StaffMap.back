import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointsEntity } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(PointsEntity)
    private readonly pointsRepository: Repository<PointsEntity>,
  ) {}

  public async getAllPoints(): Promise<PointsEntity[]> {
    return await this.pointsRepository.find();
  }
}
