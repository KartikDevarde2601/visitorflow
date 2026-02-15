import { Test, TestingModule } from '@nestjs/testing';
import { VisitorsService } from './visitors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Visitor, VisitorType } from './entities/visitor.entity';
import { Repository } from 'typeorm';
import { CreateVisitorDto } from './dto/create-visitor.dto';

describe('VisitorsService', () => {
  let service: VisitorsService;
  let repository: Repository<Visitor>;

  const mockVisitorRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisitorsService,
        {
          provide: getRepositoryToken(Visitor),
          useValue: mockVisitorRepository,
        },
      ],
    }).compile();

    service = module.get<VisitorsService>(VisitorsService);
    repository = module.get<Repository<Visitor>>(getRepositoryToken(Visitor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a visitor', async () => {
      const createVisitorDto: CreateVisitorDto = {
        name: 'Jane Doe',
        phone: '+1234567890',
        type: VisitorType.GUEST,
      };
      const savedVisitor = { id: 'uuid', ...createVisitorDto, createdAt: new Date(), updatedAt: new Date() };

      mockVisitorRepository.create.mockReturnValue(savedVisitor);
      mockVisitorRepository.save.mockResolvedValue(savedVisitor);

      const result = await service.create(createVisitorDto);
      expect(result).toEqual(savedVisitor);
      expect(mockVisitorRepository.create).toHaveBeenCalledWith(createVisitorDto);
      expect(mockVisitorRepository.save).toHaveBeenCalledWith(savedVisitor);
    });
  });

  describe('findByPhone', () => {
    it('should return a visitor by phone', async () => {
      const phone = '+1234567890';
      const result = { name: 'Jane Doe', phone };
      mockVisitorRepository.findOneBy.mockResolvedValue(result);
      expect(await service.findByPhone(phone)).toBe(result);
    });
  });
});
