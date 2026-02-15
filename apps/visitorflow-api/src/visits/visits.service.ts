import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit, VisitStatus } from './entities/visit.entity';
import { Visitor } from '../visitors/entities/visitor.entity';
import { User } from '../users/entities/user.entity';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitStatusDto } from './dto/update-visit-status.dto';

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(Visit)
    private visitRepository: Repository<Visit>,
    @InjectRepository(Visitor)
    private visitorRepository: Repository<Visitor>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createVisitDto: CreateVisitDto) {
    const visitor = await this.visitorRepository.findOneBy({ id: createVisitDto.visitorId });
    if (!visitor) {
      throw new NotFoundException(`Visitor with ID ${createVisitDto.visitorId} not found`);
    }

    let host = null;
    if (createVisitDto.hostId) {
      host = await this.userRepository.findOneBy({ id: createVisitDto.hostId });
      if (!host) {
        throw new NotFoundException(`Host with ID ${createVisitDto.hostId} not found`);
      }
    }

    const visit = this.visitRepository.create({
      ...createVisitDto,
      visitor,
      host,
      status: VisitStatus.PENDING,
    });

    return this.visitRepository.save(visit);
  }

  findAll() {
    return this.visitRepository.find({
      relations: ['visitor', 'host', 'guard'],
    });
  }

  findOne(id: string) {
    return this.visitRepository.findOne({
      where: { id },
      relations: ['visitor', 'host', 'guard'],
    });
  }

  async updateStatus(id: string, updateVisitStatusDto: UpdateVisitStatusDto) {
    const visit = await this.visitRepository.preload({
      id,
      status: updateVisitStatusDto.status,
    });
    if (!visit) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }
    return this.visitRepository.save(visit);
  }

  async logEntry(id: string, guardId: string) {
    const guard = await this.userRepository.findOneBy({ id: guardId });
    if (!guard) {
      throw new NotFoundException(`Guard with ID ${guardId} not found`);
    }

    const visit = await this.visitRepository.preload({
      id,
      status: VisitStatus.ENTERED,
      entryTime: new Date(),
      guard,
    });
    if (!visit) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }
    return this.visitRepository.save(visit);
  }

  async logExit(id: string) {
    const visit = await this.visitRepository.preload({
      id,
      status: VisitStatus.EXITED,
      exitTime: new Date(),
    });
    if (!visit) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }
    return this.visitRepository.save(visit);
  }
}
