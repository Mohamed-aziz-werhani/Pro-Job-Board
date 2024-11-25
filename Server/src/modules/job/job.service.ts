import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/models/company.entity';
import { JobEntity } from 'src/models/job.entity';
import { UserEntity } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobService {

  constructor(
    @InjectRepository(JobEntity) private readonly jobRepository: Repository<JobEntity>,
    @InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) { }

  async create(payload: Partial<JobEntity>) {
    try {

      const company = await this.companyRepository.findOne({ where: { id: payload.company.id } })

      const data = this.jobRepository.create({
        ...payload,
        company
      });
      return await this.jobRepository.save(data);
    } catch (error) {
      return error
    }
  }

  async create1(job:any,namecom:string,id:string) {
    try {

      const company = await this.companyRepository.findOne({ where: { name: namecom } })
const user=await this.userRepository.findOne({where :{id:id}})
      const data = this.jobRepository.create({
        ...job,
        company,
        user
      });
      return await this.jobRepository.save(data);
    } catch (error) {
      return error
    }
  }
  
  async findAll() {
    try {
      return await this.jobRepository.find({
        relations: ['company', 'applications','user'],
      });
    } catch (error) {
      return error
    }
  }

  async findOne(id: string) {
    try {
      return await this.jobRepository.findOne({
        where: { id },
        relations: ['company'],
      });
    } catch (error) {
      return error
    }
  }

  async update(id: string, payload: Partial<JobEntity>) {
    try {
      return await this.jobRepository.update({ id }, payload);
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      return await this.jobRepository.delete({ id });
    } catch (error) {
      return error
    }
  }
  //logique de review
  
}
