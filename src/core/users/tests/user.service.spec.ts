import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SingUpAuthDto } from 'src/api/auth/dtos';
import { BadRequestException } from '@nestjs/common';
import { hash } from 'argon2';
import { UserService } from '../services';
import { PointsEntity } from 'src/core/product/entities/points.entities';
import { RoleEnum } from 'src/shared/enums/user';
import { UserEntity } from '../entity/user.entity';

jest.mock('argon2', () => ({
  hash: jest.fn(),
}));

const mockUserEntity: UserEntity = {
  id: '1',
  email: 'test@example.com',
  password: 'hashed_password',
  role: RoleEnum.MANAGER,
  createdAt: new Date(),
  updatedAt: new Date(),
  firstName: '',
  lastName: '',
  birthday: undefined,
  point: new PointsEntity(),
};

const mockRepository = {
  create: jest.fn(),
  insert: jest.fn(),
  findOne: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createUser', () => {
    const mockSignUpDto: SingUpAuthDto = {
      email: 'test@example.com',
      password: 'plain_password',
      firstName: '',
      lastName: '',
      birthday: '',
    };

    it('should create a user successfully', async () => {
      (hash as jest.Mock).mockResolvedValue('hashed_password');
      mockRepository.create.mockReturnValue(mockUserEntity);
      mockRepository.insert.mockResolvedValue({});

      const result = await service.createUser(mockSignUpDto);
      expect(result).toBe(true);
      expect(hash).toHaveBeenCalledWith(mockSignUpDto.password);
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...mockSignUpDto,
        password: 'hashed_password',
        role: RoleEnum.MANAGER,
      });
      expect(mockRepository.insert).toHaveBeenCalledWith(mockUserEntity);
    });

    it('should throw BadRequestException on failure', async () => {
      (hash as jest.Mock).mockResolvedValue('hashed_password');
      mockRepository.create.mockReturnValue(mockUserEntity);
      mockRepository.insert.mockRejectedValue(new Error('Insert Error'));

      await expect(service.createUser(mockSignUpDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockUserEntity);

      const result = await service.findById('1');
      expect(result).toEqual(mockUserEntity);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return null if user is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findById('2');
      expect(result).toBeNull();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '2' },
      });
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      mockRepository.findOne.mockResolvedValue(mockUserEntity);

      const result = await service.findByEmail('test@example.com');
      expect(result).toEqual(mockUserEntity);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should return null if user is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findByEmail('notfound@example.com');
      expect(result).toBeNull();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'notfound@example.com' },
      });
    });
  });
});
