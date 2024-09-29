import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user.entity';
import { CompanyEntity } from 'src/models/company.entity';
import { RoleEntity } from 'src/models/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleEntity
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class ApplicationModule { }