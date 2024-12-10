import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultationEntity } from '../entities';
import { ConsultationService } from '../services';

const mockConsultationEntity = {
  id: '1',
  name: 'Test Consultation',
};

const mockConsultationsRepository = {
  find: jest.fn(),
  create: jest.fn(),
  insert: jest.fn(),
  delete: jest.fn(),
};

describe('ConsultationService', () => {
  let service: ConsultationService;
  let repository: Repository<ConsultationEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsultationService,
        {
          provide: getRepositoryToken(ConsultationEntity),
          useValue: mockConsultationsRepository,
        },
      ],
    }).compile();

    service = module.get<ConsultationService>(ConsultationService);
    repository = module.get<Repository<ConsultationEntity>>(
      getRepositoryToken(ConsultationEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of consultations', async () => {
      mockConsultationsRepository.find.mockResolvedValue([
        mockConsultationEntity,
      ]);
      const result = await service.findAll();
      expect(result).toEqual([mockConsultationEntity]);
      expect(mockConsultationsRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('addNewOrder', () => {
    it('should add a new consultation successfully', async () => {
      mockConsultationsRepository.create.mockReturnValue(
        mockConsultationEntity,
      );
      mockConsultationsRepository.insert.mockResolvedValue(undefined);

      const result = await service.addNewOrder(mockConsultationEntity);
      expect(result).toEqual({ result: true });
      expect(mockConsultationsRepository.create).toHaveBeenCalledWith(
        mockConsultationEntity,
      );
      expect(mockConsultationsRepository.insert).toHaveBeenCalledWith(
        mockConsultationEntity,
      );
    });

    it('should handle errors when adding a new consultation', async () => {
      mockConsultationsRepository.create.mockReturnValue(
        mockConsultationEntity,
      );
      mockConsultationsRepository.insert.mockRejectedValue(
        new Error('Insert Error'),
      );

      const result = await service.addNewOrder(mockConsultationEntity);
      expect(result).toEqual({
        result: false,
        error: new Error('Insert Error'),
      });
      expect(mockConsultationsRepository.create).toHaveBeenCalled();
      expect(mockConsultationsRepository.insert).toHaveBeenCalled();
    });
  });

  describe('deleteOrderById', () => {
    it('should delete a consultation successfully', async () => {
      mockConsultationsRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.deleteOrderById('1');
      expect(result).toEqual({ result: true });
      expect(mockConsultationsRepository.delete).toHaveBeenCalledWith({
        id: '1',
      });
    });

    it('should handle errors when deleting a consultation', async () => {
      mockConsultationsRepository.delete.mockRejectedValue(
        new Error('Delete Error'),
      );

      const result = await service.deleteOrderById('1');
      expect(result).toEqual({
        result: false,
        error: new Error('Delete Error'),
      });
      expect(mockConsultationsRepository.delete).toHaveBeenCalledWith({
        id: '1',
      });
    });
  });
});
