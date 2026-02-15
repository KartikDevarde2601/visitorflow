import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  passwordHash: string; // Ideally this should be just 'password' and hashed in service, but following entity for now

  @IsOptional()
  isActive?: boolean;
}
