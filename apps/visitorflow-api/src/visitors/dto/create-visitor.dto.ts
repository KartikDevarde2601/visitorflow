import { IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { VisitorType } from '../entities/visitor.entity';

export class CreateVisitorDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsEnum(VisitorType)
  type: VisitorType;
}
