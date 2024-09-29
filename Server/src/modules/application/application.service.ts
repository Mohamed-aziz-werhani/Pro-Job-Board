import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationEntity } from 'src/models/application.entity';
import { JobEntity } from 'src/models/job.entity';
import { UserEntity } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/models/role.entity';
import { Multer } from 'multer';

@Injectable()
export class ApplicationService {

  constructor(
    @InjectRepository(ApplicationEntity) private readonly applicationRepository: Repository<ApplicationEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(JobEntity) private readonly jobRepository: Repository<JobEntity>,
    @InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>
  ) { }
/*multer */
  async create(payload: Partial<ApplicationEntity>, job_id: string) {
    try {
      const attachedJob = await this.jobRepository.findOne({ where: { id: job_id } })
      const data = await this.applicationRepository.create({
        ...payload,
        job: attachedJob
      })

      return await this.applicationRepository.save(data)
    } catch (error) {
      return error
    }
  }

  async findAll(job_id: string) {
    try {
      return await this.applicationRepository.find({
        where: { job: { id: job_id } },
      });
    } catch (error) {
      return error
    }
  }

  async findOne(id: string) {
    try {
      return await this.applicationRepository.findOne({ where: { id } });
    } catch (error) {
      return error
    }
  }

  async update(id: string, payload: Partial<ApplicationEntity>) {
    try {
      return await this.applicationRepository.update({ id }, payload);
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      return await this.applicationRepository.delete({ id });
    } catch (error) {
      return error
    }
  }
  //logique de review 
}
