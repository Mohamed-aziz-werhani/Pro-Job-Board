import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user.entity';
import { CompanyEntity } from 'src/models/company.entity';
import { HttpModule } from '@nestjs/axios';
import { RoleEntity } from 'src/models/role.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      UserEntity,
      RoleEntity
    ]),
   HttpModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class ApplicationModule { }