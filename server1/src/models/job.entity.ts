import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { CompanyEntity } from "./company.entity";
import { ApplicationEntity } from "./application.entity";
import { UserEntity } from "./user.entity";

@Entity('job')
export class JobEntity extends BaseEntity {

    @Column({ default: 'Job Title Not Available' })
    title: string;

    @Column({ default: 'Job Description Not Available' })
    description: string;
    @Column({default:0})
    num_reveiw_rec:number;

    // each job belongs to one company
    @ManyToOne(() => CompanyEntity, (company) => company.jobs)
    company: CompanyEntity;

    @OneToMany(() => ApplicationEntity, (application) => application.job)
    @JoinColumn()
    applications: JobEntity;
    @ManyToOne(()=>UserEntity,user=>user.jobs)
    @JoinColumn()
    user:UserEntity;
}
