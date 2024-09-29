import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from 'src/models/job.entity';
import { CompanyEntity } from 'src/models/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobEntity,
      CompanyEntity,
    ]),
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule { }
