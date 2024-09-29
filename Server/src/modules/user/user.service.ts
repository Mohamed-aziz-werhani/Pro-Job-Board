import { Injectable, HttpServer } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user.entity';
import { CompanyEntity } from 'src/models/company.entity';
import { Repository } from 'typeorm';
import { CeoEntity } from 'src/models/ceo.entity';
import axois from 'axios';
import { RoleEntity } from 'src/models/role.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CompanyEntity) private readonly comapnyRepository: Repository<CompanyEntity>,
    @InjectRepository(RoleEntity) private readonly RoleRepository: Repository<RoleEntity>,
  ) { }


  async createUser(user: Partial<UserEntity>) {
    const newuser = this.userRepository.create(user);
    await this.userRepository.save(newuser);
    return newuser;

  }

  async verif_com_existe(id: string) {
    const Api_url = `https://www.registre-entreprises.tn/rne-api/public/registres/pm?limit=2&idUnique=${id}&notInStatusList=EN_COURS_CREATION`
    const response: any = await axois.get(Api_url)
    if (response?.data?.registres) { return true }
    return false;
  }
  async verifuser(name:string){
    try{
      const user=await this.userRepository.find({
        where :{name:name}
      })
    if(user.length==0){
      return true;
    }else{
        return false;
      }
    // return user
     
    }catch(err){
      return err;
    }
  }
  /**/async Delete(id:string){
  await this.userRepository.delete({
    id:id
  })
  }
 async getusers(){
 return  await this.userRepository.find();
 }
 
 async getuser(id:string){
  return  await this.userRepository.find(
   {
    where:{id:id}
   }
  );
  }
  async getuserByemail(email:string){
    return await this.userRepository.find(
      {
        where:{email:email}
      }
    )
  }
  async findUsersByRole(type:string){
    let users=await this.RoleRepository
    .createQueryBuilder('role')
    .leftJoin('role.user', 'users')
    .where( `role.name = :type`, {type})
    .getMany();
    // console.log(users)
 
    return users;
  }
  




}