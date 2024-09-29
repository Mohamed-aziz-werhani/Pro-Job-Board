import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationEntity } from 'src/models/application.entity';
import { ApiTags } from '@nestjs/swagger';
import IResponse from 'src/common/types';

@Controller({ version: '1', path: 'applications' })
@ApiTags('Application Management Routes')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) { }

  @Post(':job_id')
  async create(
    @Body() payload: Partial<ApplicationEntity>,
    @Param('job_id') job_id: string
  ): Promise<IResponse> {
    const response = await this.applicationService.create(payload, job_id);
    return {
      data: response,
      status: 201
    }
  }

  @Get(':job_id')
  async findAll(@Param('job_id') job_id: string) {
    const response = await this.applicationService.findAll(job_id);
    return {
      data: response,
      status: 200,
      count: response.length
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.applicationService.findOne(id);
    return {
      data: response,
      status: 200
    }
  }

 /* lorsque le condidat peut modifier quelque chose il est obligé d'ajoute une autre app avec cette modification 
 @Put(':id')
  async update(@Param('id') id: string, @Body() payload: Partial<ApplicationEntity>) {
    const response = await this.applicationService.update(id, payload);
    return {
      data: response,
      status: 200
    }
  }*/

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.applicationService.remove(id);
    return {
      data: response,
      status: 200
    }
  }
  /*@Post("review")
  async sendReview()*/
}
