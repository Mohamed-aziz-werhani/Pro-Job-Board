import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, MissingJoinTableError, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { JobEntity } from "./job.entity";
import { ApplicationEntity } from "./application.entity";
import { CompanyEntity } from "./company.entity";
import { UserEntity } from "./user.entity";

export class CeoEntity extends UserEntity {

   
   
    name_com: string;
    
    email_com:string;

    ceoId_com:number
 
    phone_com:number
   Id_company:string;

}
