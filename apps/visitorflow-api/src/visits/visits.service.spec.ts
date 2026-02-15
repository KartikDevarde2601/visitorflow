import { Test, TestingModule } from '@nestjs/testing';
import { VisitsService } from './visits.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Visit, VisitStatus } from './entities/visit.entity';
import { Visitor } from '../visitors/entities/visitor.entity';
import { User } from '../users/entities/user.entity';
import { CreateVisitDto } from './dto/create-visit.dto';

describe('VisitsService', () => {
  let service: VisitsService;

  const mockVisitRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
  };

  const mockVisitorRepository = {
    findOneBy: jest.fn(),
  };

  const mockUserRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisitsService,
        {
          provide: getRepositoryToken(Visit),
          useValue: mockVisitRepository,
        },
        {
          provide: getRepositoryToken(Visitor),
          useValue: mockVisitorRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<VisitsService>(VisitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a visit request', async () => {
      const createVisitDto: CreateVisitDto = {
        visitorId: 'v-uuid',
        hostId: 'h-uuid',
        purpose: 'Meeting',
        expectedTime: new Date().toISOString(),
      };

      const visitor = { id: 'v-uuid', name: 'Jane' };
      const host = { id: 'h-uuid', name: 'John' };
      const savedVisit = { id: 'visit-uuid', ...createVisitDto, status: VisitStatus.PENDING, visitor, host };

      mockVisitorRepository.findOneBy.mockResolvedValue(visitor);
      mockUserRepository.findOneBy.mockResolvedValue(host);
      mockVisitRepository.create.mockReturnValue(savedVisit);
      mockVisitRepository.save.mockResolvedValue(savedVisit);

      const result = await service.create(createVisitDto);
      expect(result).toEqual(savedVisit);
      expect(mockVisitRepository.create).toHaveBeenCalled();
    });
  });
});
