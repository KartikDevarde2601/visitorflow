import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateVisitDto {
  @IsNotEmpty()
  @IsUUID()
  visitorId: string;

  @IsOptional()
  @IsUUID()
  hostId?: string;

  @IsNotEmpty()
  @IsString()
  purpose: string;

  @IsNotEmpty()
  @IsDateString()
  expectedTime: string;
}
