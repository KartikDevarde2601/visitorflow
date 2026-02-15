import { User, UserRole } from './user.entity';

describe('User Entity', () => {
  it('should create a user instance', () => {
    const user = new User();
    user.name = 'John Doe';
    user.email = 'john@example.com';
    user.phone = '1234567890';
    user.role = UserRole.GUARD;
    user.passwordHash = 'hashedpassword';
    user.isActive = true;

    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.role).toBe(UserRole.GUARD);
  });
});
