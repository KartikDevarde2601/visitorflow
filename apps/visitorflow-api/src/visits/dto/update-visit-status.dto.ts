import { IsEnum, IsNotEmpty } from 'class-validator';
import { VisitStatus } from '../entities/visit.entity';

export class UpdateVisitStatusDto {
  @IsNotEmpty()
  @IsEnum(VisitStatus)
  status: VisitStatus;
}
