import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEntity } from 'src/models/job.entity';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/models/role.entity';
import { UserEntity } from 'src/models/user.entity';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>,
  ) { }
  async createrole(role:Partial<RoleEntity>){
    const newRole=this.roleRepository.create(role);
     await this.roleRepository.save(newRole);
     return newRole;
}
async getRolebyId(id:string){
    const role =await this.roleRepository.find(
  {where:{id:id}})
  return role;
}
/**/
async getRolebyUserId(id:string){
  const role =await this.roleRepository.find(
{where:{id_user:id}})
return role;
}
async deleterole(id:string){
 await this.roleRepository.delete({id:id});
}
async verifRecruteur(rec:Partial<UserEntity>){
  const roles=await this.getRolebyId(rec.id);
    roles.map((role)=>{
      if(role.name=="RECRUTEUR"||role.name=="CEO"){
  return true;
      }
    })
    return false;
}
}


