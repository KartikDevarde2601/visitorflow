import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { Visit } from './entities/visit.entity';
import { Visitor } from '../visitors/entities/visitor.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Visit, Visitor, User])],
  controllers: [VisitsController],
  providers: [VisitsService],
  exports: [VisitsService],
})
export class VisitsModule {}
