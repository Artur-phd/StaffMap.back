import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PointsEntity } from '../entities';
import { BadRequestException, HttpException } from '@nestjs/common';
import { PointsService } from '../services/points.service';
import { UserEntity } from 'src/core/users/entity';

const mockPointsRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  insert: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe('PointsService', () => {
  let service: PointsService;
  let repository: jest.Mocked<Repository<PointsEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PointsService,
        {
          provide: getRepositoryToken(PointsEntity),
          useValue: mockPointsRepository,
        },
      ],
    }).compile();

    service = module.get<PointsService>(PointsService);
    repository = module.get(getRepositoryToken(PointsEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPointsIsMy', () => {
    it('should return a list of points', async () => {
      const userId = 'user-id';
      const mockUser = { id: 'user-id' } as UserEntity;
      const mockPoints = [
        {
          id: 'user-id',
          title: 'Point 1',
          user: mockUser,
          moneyRate: 10,
          minStaff: 2,
          maxStaff: 5,
          workHours: 11,
          address: '123 Main St',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      repository.find.mockResolvedValue(mockPoints);

      const result = await service.getPointsIsMy();
      expect(repository.find).toHaveBeenCalledWith({
        order: { title: 'ASC' },
        where: { user: { id: userId } },
        select: expect.any(Object),
      });
      expect(result).toEqual(mockPoints);
    });
  });

  describe('addPoint', () => {
    it('should throw an error if point with title already exists', async () => {
      const mockUser = { id: 'user-id' } as UserEntity;
      const payload = {
        title: 'Point 1',
        user: mockUser,
        id: 'user-id',
        moneyRate: 10,
        minStaff: 2,
        maxStaff: 5,
        workHours: 15,
        address: '123 street',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repository.findOneBy.mockResolvedValue(payload);

      await expect(service.addPoint(payload)).rejects.toThrow(
        BadRequestException,
      );
      expect(repository.findOneBy).toHaveBeenCalledWith({
        title: payload.title,
        user: { id: payload.user },
      });
    });

    it('should add a new point successfully', async () => {
      const mockUser = { id: 'user-id' } as UserEntity;
      const payload = {
        title: 'Point 1',
        user: mockUser,
        id: '1',
        moneyRate: 10,
        minStaff: 2,
        maxStaff: 5,
        workHours: 15,
        address: '123 street',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      repository.findOneBy.mockResolvedValue(null);
      repository.create.mockReturnValue(payload);
      repository.insert.mockResolvedValue(undefined);

      await expect(service.addPoint(payload)).rejects.toThrow(HttpException);
      expect(repository.create).toHaveBeenCalledWith(payload);
      expect(repository.insert).toHaveBeenCalledWith(payload);
    });
  });

  describe('deletePointById', () => {
    it('should throw an error if point deletion fails', async () => {
      repository.delete.mockResolvedValue({ affected: 0, raw: {} });

      await expect(
        service.deletePointById('point-id', 'user-id'),
      ).rejects.toThrow(BadRequestException);
      expect(repository.delete).toHaveBeenCalledWith({
        id: 'point-id',
        user: { id: 'user-id' },
      });
    });

    it('should delete the point successfully', async () => {
      repository.delete.mockResolvedValue({ affected: 1, raw: {} });

      await expect(
        service.deletePointById('point-id', 'user-id'),
      ).rejects.toThrow(HttpException);
      expect(repository.delete).toHaveBeenCalledWith({
        id: 'point-id',
        user: { id: 'user-id' },
      });
    });
  });

  describe('editById', () => {
    it('should throw an error if point update fails', async () => {
      repository.update.mockResolvedValue({
        affected: 0,
        raw: {},
        generatedMaps: [],
      });
      const mockUser = { id: 'user-id' } as UserEntity;
      const payload = {
        title: 'Updated Point',
        user: mockUser,
        id: '1',
        moneyRate: 10,
        minStaff: 2,
        maxStaff: 5,
        workHours: 15,
        address: '123 street',
      };

      await expect(
        service.editById(payload, 'point-id', 'user-id'),
      ).rejects.toThrow(BadRequestException);
      expect(repository.update).toHaveBeenCalledWith(
        { id: 'point-id', user: { id: 'user-id' } },
        expect.any(Object),
      );
    });

    it('should update the point successfully', async () => {
      repository.update.mockResolvedValue({
        affected: 1,
        raw: {},
        generatedMaps: [],
      });
      const mockUser = { id: 'user-id' } as UserEntity;
      const payload = {
        title: 'Updated Point',
        user: mockUser,
        id: '1',
        moneyRate: 10,
        minStaff: 2,
        maxStaff: 5,
        workHours: 15,
        address: '123 street',
      };

      await expect(
        service.editById(payload, 'point-id', 'user-id'),
      ).rejects.toThrow(HttpException);
      expect(repository.update).toHaveBeenCalledWith(
        { id: 'point-id', user: { id: 'user-id' } },
        expect.any(Object),
      );
    });
  });
});
