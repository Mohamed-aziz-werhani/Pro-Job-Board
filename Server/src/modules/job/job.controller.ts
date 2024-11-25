import { Controller, Get, Post, Body, Patch, Param, Delete ,Res,Req} from '@nestjs/common';
import { JobService } from './job.service';
import { JobEntity } from 'src/models/job.entity';
import { ApiTags } from '@nestjs/swagger';
import IResponse from 'src/common/types';
import { Request ,Response} from 'express'
import { CompanyService } from '../company/company.service';
import { title } from 'process';
import { UserService } from '../user/user.service';
@Controller({ version: '1', path: 'jobs' })
@ApiTags('Jobs Management Routes')
export class JobController {
  constructor(private readonly jobService: JobService,private readonly companyService:CompanyService) { }

  @Post()
  async create(@Body() payload: Partial<JobEntity>): Promise<IResponse> {
    const response = await this.jobService.create(payload);
    return {
      data: response,
      status: 201
    }
  }

  @Post("createJ/:id")
  async creatJob(@Req() req:Request,@Res() res:Response,@Param("id") id:string){
    const verif=this.companyService.verif_rec_com(id,req.body.namecom);
    const data={
      title:req.body.title,
      description:req.body.description,
      Requirement:req.body.Requirement
    }
  if(verif){
    const job=await this.jobService.create1(data,req.body.namecom,id);
    res.json(job)
  }else{
    res.json("ce recruteur est n'appartient pas a cette entreprise !")
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
