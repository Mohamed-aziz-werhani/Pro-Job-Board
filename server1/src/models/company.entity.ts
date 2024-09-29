import { Column, Entity, JoinColumn, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity"
import { JobEntity } from "./job.entity";
import { UserEntity } from "./user.entity";


@Entity('company')
export class CompanyEntity extends BaseEntity {

    @Column({ unique: true })
    name: string;
    @Column()
    email:string;
    @Column()
    ceoId:string;
    @Column()
    phone:number;
   @Column("simple-array", { nullable: true , default: null })
   id_recs:string[]|null;

    @OneToMany(() => JobEntity, job => job.company)
    @JoinColumn()
    jobs: JobEntity[];
    @ManyToMany(()=>UserEntity,user=>user.companys)
    @JoinColumn()
    users:UserEntity[];
}
