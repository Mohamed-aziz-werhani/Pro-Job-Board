import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/models/company.entity';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
    ]),
MulterModule.register({
  dest: join(process.cwd(), 'src', 'uploads'), // Chemin absolu vers le dossier 'uploads' dans 'src'
})
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule { }
