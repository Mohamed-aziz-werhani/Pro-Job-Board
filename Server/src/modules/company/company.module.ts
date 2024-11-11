import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/models/company.entity';
import { ImageService } from './image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService,ImageService],
})
export class CompanyModule { }
