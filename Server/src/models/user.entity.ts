import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, MissingJoinTableError, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { JobEntity } from "./job.entity";
import { ApplicationEntity } from "./application.entity";
import { CompanyEntity } from "./company.entity";
import { RoleEntity } from "./role.entity";


@Entity('user')
export class UserEntity extends BaseEntity {

    @Column({ default: 'Jhon Doe' })
    name: string;

    @Column({ default: 'jhon@example.com' })
    email: string;

    @Column()
    password: string;
    @OneToMany(()=>ApplicationEntity,app=>app.user)
    @JoinColumn()
   apps:ApplicationEntity[];
   @ManyToMany(()=>CompanyEntity,company=>company.users)
   @JoinColumn()
   companys:CompanyEntity[];
   @OneToMany(()=>JobEntity,job=>job.user)
   @JoinColumn()
   jobs:JobEntity[];
   @OneToMany(()=>RoleEntity,role=>role.user)
   @JoinColumn()
   roles:RoleEntity[];
}
