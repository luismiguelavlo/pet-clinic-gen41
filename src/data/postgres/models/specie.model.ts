import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from './pet.model';

@Entity()
export class Specie extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 30,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column('varchar', {
    array: true,
    nullable: true,
  })
  img_url: string[];

  @OneToOne(() => Pet, (pet) => pet.specie)
  pet: Pet;
}
