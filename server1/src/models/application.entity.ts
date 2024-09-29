import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { JobEntity } from "./job.entity";
import { UserEntity } from "./user.entity";
import { blob } from "stream/consumers";


@Entity('application')
export class ApplicationEntity extends BaseEntity {

    @Column({ default: 'Jhon Doe' })
    application_name: string;

    @Column({ default: 'jhon@example.com' })
    application_email: string;

    @Column()
    lettre_de_motivation: string;
    @Column("blob")
    CV:Buffer
    @Column()
    feedback: string;
    @Column({default:0})
    review_count:number;

    // each application belong to a job
    @ManyToOne(() => JobEntity, (job) => job.applications, { onDelete: 'CASCADE', cascade: true })
    job: JobEntity;
    @ManyToOne(()=>UserEntity,user=>user.apps)
    @JoinColumn()
    user:UserEntity;
}
