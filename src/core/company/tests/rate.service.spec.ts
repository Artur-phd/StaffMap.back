import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RateEntity } from '../entities';
import { Repository } from 'typeorm';
import { RateDto } from 'src/api/company/dtos';
import { RateService } from '../services';

const mockRateEntity = {
  id: '1',
  title: 'Basic Plan',
  points: 100,
  financialControl: true,
  artificialIntelligence: true,
  employeesOfTheSomeClass: 10,
  automationOfPayments: false,
  price: 500,
  active: true,
};

const mockRateDto: RateDto = {
  id: '1',
  title: 'Basic Plan',
  points: 100,
  financialControl: true,
  artificialIntelligence: true,
  employeesOfTheSomeClass: 10,
  automationOfPayments: false,
  price: 500,
  active: true,
};

const mockRateRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe('RateService', () => {
  let service: RateService;
  let repository: Repository<RateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RateService,
        {
          provide: getRepositoryToken(RateEntity),
          useValue: mockRateRepository,
        },
      ],
    }).compile();

    service = module.get<RateService>(RateService);
    repository = module.get<Repository<RateEntity>>(
      getRepositoryToken(RateEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('getInfoRates', () => {
    it('should return an array of active rates', async () => {
      mockRateRepository.find.mockResolvedValue([mockRateEntity]);

      const result = await service.getInfoRates();
      expect(result).toEqual([mockRateEntity]);
      expect(mockRateRepository.find).toHaveBeenCalledWith({
        where: { active: true },
        select: {
          id: true,
          title: true,
          points: true,
          financialControl: true,
          artificialIntelligence: true,
          employeesOfTheSomeClass: true,
          automationOfPayments: true,
          price: true,
        },
      });
    });
  });

  describe('createNewRateAtDB', () => {
    it('should create a new rate successfully', async () => {
      mockRateRepository.create.mockReturnValue(mockRateEntity);
      mockRateRepository.save.mockResolvedValue(mockRateEntity);

      const result = await service.createNewRateAtDB(mockRateDto);
      expect(result).toEqual({ result: true });
      expect(mockRateRepository.create).toHaveBeenCalledWith(mockRateDto);
      expect(mockRateRepository.save).toHaveBeenCalledWith(mockRateEntity);
    });

    it('should handle errors during rate creation', async () => {
      mockRateRepository.create.mockReturnValue(mockRateEntity);
      mockRateRepository.save.mockRejectedValue(new Error('Save Error'));

      const result = await service.createNewRateAtDB(mockRateDto);
      expect(result).toEqual({ result: false, error: new Error('Save Error') });
      expect(mockRateRepository.create).toHaveBeenCalled();
      expect(mockRateRepository.save).toHaveBeenCalled();
    });
  });

  describe('deleteRate', () => {
    it('should delete a rate by title successfully', async () => {
      mockRateRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.deleteRate('Basic Plan');
      expect(result).toEqual({ result: true });
      expect(mockRateRepository.delete).toHaveBeenCalledWith({
        title: 'Basic Plan',
      });
    });

    it('should handle errors during rate deletion', async () => {
      mockRateRepository.delete.mockRejectedValue(new Error('Delete Error'));

      const result = await service.deleteRate('Basic Plan');
      expect(result).toEqual({
        result: false,
        error: new Error('Delete Error'),
      });
      expect(mockRateRepository.delete).toHaveBeenCalledWith({
        title: 'Basic Plan',
      });
    });
  });

  describe('editById', () => {
    it('should update a rate by id successfully', async () => {
      mockRateRepository.create.mockReturnValue(mockRateEntity);
      mockRateRepository.update.mockResolvedValue(undefined);

      const result = await service.editById(mockRateDto);
      expect(result).toEqual({ result: true });
      expect(mockRateRepository.create).toHaveBeenCalledWith(mockRateDto);
      expect(mockRateRepository.update).toHaveBeenCalledWith(
        mockRateDto.id,
        mockRateEntity,
      );
    });

    it('should handle errors during rate update', async () => {
      mockRateRepository.create.mockReturnValue(mockRateEntity);
      mockRateRepository.update.mockRejectedValue(new Error('Update Error'));

      const result = await service.editById(mockRateDto);
      expect(result).toEqual({
        result: false,
        error: new Error('Update Error'),
      });
      expect(mockRateRepository.create).toHaveBeenCalled();
      expect(mockRateRepository.update).toHaveBeenCalled();
    });
  });
});
