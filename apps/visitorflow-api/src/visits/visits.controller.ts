import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitStatusDto } from './dto/update-visit-status.dto';

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  create(@Body() createVisitDto: CreateVisitDto) {
    return this.visitsService.create(createVisitDto);
  }

  @Get()
  findAll() {
    return this.visitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitsService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateVisitStatusDto: UpdateVisitStatusDto) {
    return this.visitsService.updateStatus(id, updateVisitStatusDto);
  }

  @Post(':id/entry')
  logEntry(@Param('id') id: string, @Body('guardId') guardId: string) {
    return this.visitsService.logEntry(id, guardId);
  }

  @Post(':id/exit')
  logExit(@Param('id') id: string) {
    return this.visitsService.logExit(id);
  }
}
