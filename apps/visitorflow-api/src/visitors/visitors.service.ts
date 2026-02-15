import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visitor } from './entities/visitor.entity';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectRepository(Visitor)
    private visitorRepository: Repository<Visitor>,
  ) {}

  create(createVisitorDto: CreateVisitorDto) {
    const visitor = this.visitorRepository.create(createVisitorDto);
    return this.visitorRepository.save(visitor);
  }

  findAll() {
    return this.visitorRepository.find();
  }

  findOne(id: string) {
    return this.visitorRepository.findOneBy({ id });
  }

  findByPhone(phone: string) {
    return this.visitorRepository.findOneBy({ phone });
  }

  async update(id: string, updateVisitorDto: UpdateVisitorDto) {
    const visitor = await this.visitorRepository.preload({
      id,
      ...updateVisitorDto,
    });
    if (!visitor) {
      return null;
    }
    return this.visitorRepository.save(visitor);
  }

  async remove(id: string) {
    const visitor = await this.findOne(id);
    if (!visitor) {
      return null;
    }
    return this.visitorRepository.remove(visitor);
  }
}
