import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, MissingJoinTableError, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { JobEntity } from "./job.entity";
import { ApplicationEntity } from "./application.entity";
import { CompanyEntity } from "./company.entity";
import { UserEntity } from "./user.entity";

export enum UserRole {
    RECRUTEUR = 'RECRUTEUR',
    CONDIDAT = 'CONDIDAT',
    CEO = 'CEO'
  }
@Entity('role')
export class RoleEntity extends BaseEntity {

    @Column({type:'enum',enum:UserRole})
    name: UserRole;
    @Column()
    id_user: string;
    @ManyToOne(()=>UserEntity,user=>user.roles)
    @JoinColumn()
    user:UserEntity;
}