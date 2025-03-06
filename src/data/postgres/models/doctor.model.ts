import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 30,
    nullable: false,
  })
  speciality: string;

  //TODO: Agregar relaciones con user
}
