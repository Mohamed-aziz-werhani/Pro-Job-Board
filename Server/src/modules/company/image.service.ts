import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/models/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {

  constructor(
    @InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>
  ) { }

  /*async saveImage(){

  }*/

}
