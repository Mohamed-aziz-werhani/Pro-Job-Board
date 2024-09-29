import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from 'src/models/application.entity';
import { JobEntity } from 'src/models/job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationEntity,
      JobEntity,
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule { }
