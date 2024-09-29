import { Injectable, HttpServer } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import {sign} from "jsonwebtoken"
@Injectable()
export class AuthService{
 constructor(private readonly jwtservice:JwtService,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
 ){}

 async login(user:Partial<UserEntity>){
   //const paylod={name:user.name,id:user.id}
   const token=sign({...user},"secret");
    /*return {
        access_token:token
    }*/
   return {...user,token};
 }

}