import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobService } from './job.service';
import { JobEntity } from 'src/models/job.entity';
import { ApiTags } from '@nestjs/swagger';
import IResponse from 'src/common/types';

@Controller({ version: '1', path: 'jobs' })
@ApiTags('Jobs Management Routes')
export class JobController {
  constructor(private readonly jobService: JobService) { }

  @Post()
  async create(@Body() payload: Partial<JobEntity>): Promise<IResponse> {
    const response = await this.jobService.create(payload);
    return {
      data: response,
      status: 201
    }
  }

  @Get()
  async findAll(): Promise<IResponse> {
    const jobs = await this.jobService.findAll();
    return {
      data: jobs,
      status: 200,
      count: jobs.length
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse> {
    const response = await this.jobService.findOne(id);
    return {
      data: response,
      status: 200
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: Partial<JobEntity>) {
    const response = await this.jobService.update(id, payload);
    return {
      data: response,
      status: 200
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = this.jobService.remove(id);
    return {
      data: response,
      status: 200
    }
  }
}
