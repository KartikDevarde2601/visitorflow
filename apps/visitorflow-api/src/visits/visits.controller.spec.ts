import { Test, TestingModule } from '@nestjs/testing';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';
import { VisitStatus } from './entities/visit.entity';

describe('VisitsController', () => {
  let controller: VisitsController;
  let service: VisitsService;

  const mockVisitsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateStatus: jest.fn(),
    logEntry: jest.fn(),
    logExit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitsController],
      providers: [
        {
          provide: VisitsService,
          useValue: mockVisitsService,
        },
      ],
    }).compile();

    controller = module.get<VisitsController>(VisitsController);
    service = module.get<VisitsService>(VisitsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a visit', async () => {
      const dto = { visitorId: 'v', purpose: 'p', expectedTime: '2026-02-15' };
      mockVisitsService.create.mockResolvedValue({ id: '1', ...dto });
      expect(await controller.create(dto as any)).toEqual({ id: '1', ...dto });
    });
  });
});
