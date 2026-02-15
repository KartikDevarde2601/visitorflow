import { User, UserRole } from '../users/entities/user.entity';
import AppDataSource from '../config/data-source';

async function seed() {
  try {
    console.log('Initializing data source...');
    await AppDataSource.initialize();
    console.log('Data source initialized.');

    const userRepository = AppDataSource.getRepository(User);

    const users = [
      {
        name: 'Admin User',
        email: 'admin@visitorflow.com',
        phone: '9999999999',
        role: UserRole.ADMIN,
        passwordHash: 'admin_password_placeholder',
        isActive: true,
      },
      {
        name: 'Security Guard',
        email: 'guard@visitorflow.com',
        phone: '8888888888',
        role: UserRole.GUARD,
        passwordHash: 'guard_password_placeholder',
        isActive: true,
      },
      {
        name: 'Host Person',
        email: 'host@visitorflow.com',
        phone: '7777777777',
        role: UserRole.HOST,
        passwordHash: 'host_password_placeholder',
        isActive: true,
      },
    ];

    for (const userData of users) {
      const existingUser = await userRepository.findOneBy({ email: userData.email });
      if (!existingUser) {
        const user = userRepository.create(userData);
        await userRepository.save(user);
        console.log(`Created user: ${userData.name} (${userData.role})`);
      } else {
        console.log(`User already exists: ${userData.email}`);
      }
    }

    console.log('Seeding complete.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

seed();
