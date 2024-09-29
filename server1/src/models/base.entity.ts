/**
 * @description
 * This entity is used to hold the common fields
 * across all created models.
 * This entity must be extended by all other models
 */

import {
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('base_entity')
export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn() 
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
