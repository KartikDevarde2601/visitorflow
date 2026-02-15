import { Test, TestingModule } from '@nestjs/testing';
import { VisitorsController } from './visitors.controller';
import { VisitorsService } from './visitors.service';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { VisitorType } from './entities/visitor.entity';

describe('VisitorsController', () => {
  let controller: VisitorsController;
  let service: VisitorsService;

  const mockVisitorsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByPhone: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitorsController],
      providers: [
        {
          provide: VisitorsService,
          useValue: mockVisitorsService,
        },
      ],
    }).compile();

    controller = module.get<VisitorsController>(VisitorsController);
    service = module.get<VisitorsService>(VisitorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a visitor', async () => {
      const createVisitorDto: CreateVisitorDto = {
        name: 'Jane Doe',
        phone: '+1234567890',
        type: VisitorType.GUEST,
      };
      const result = { id: 'uuid', ...createVisitorDto };
      mockVisitorsService.create.mockResolvedValue(result);

      expect(await controller.create(createVisitorDto)).toBe(result);
      expect(mockVisitorsService.create).toHaveBeenCalledWith(createVisitorDto);
    });
  });

  describe('findByPhone', () => {
    it('should return a visitor by phone', async () => {
      const phone = '+1234567890';
      const result = { name: 'Jane Doe', phone };
      mockVisitorsService.findByPhone.mockResolvedValue(result);

      expect(await controller.findByPhone(phone)).toBe(result);
      expect(mockVisitorsService.findByPhone).toHaveBeenCalledWith(phone);
    });
  });
});
