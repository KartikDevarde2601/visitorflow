import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    softRemove: jest.fn(), // We are using soft remove logic or standard delete, let's assume standard delete for now but spec said deactivate/delete.
    // If we use standard delete:
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        role: UserRole.GUARD,
        passwordHash: 'password',
      };
      const savedUser = { id: 'uuid', ...createUserDto, isActive: true, createdAt: new Date(), updatedAt: new Date() };

      mockUserRepository.create.mockReturnValue(savedUser);
      mockUserRepository.save.mockResolvedValue(savedUser);

      const result = await service.create(createUserDto);
      expect(result).toEqual(savedUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(savedUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ name: 'Test' }];
      mockUserRepository.find.mockResolvedValue(result);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = { name: 'Test' };
      mockUserRepository.findOneBy.mockResolvedValue(result);
      expect(await service.findOne('uuid')).toBe(result);
    });
  });
});
