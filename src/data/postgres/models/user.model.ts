// Table user {
//   id uuid [pk]
//   fullname varchar(70) [not null]
//   password varchar(255) [not null]
//   email varchar(50) [unique, not null]
//   phone_number varchar(20) [not null]
//   role UserRole [default: 'user', not null]
//   status boolean [default: false, not null]
//   created_at timestamp [default: 'now()', not null]
// }
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  DOCTOR = "doctor",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 70,
    nullable: false,
  })
  fullname: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
  })
  password: string;

  @Column("varchar", {
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column("varchar", {
    length: 20,
    nullable: false,
  })
  phone_number: string;

  @Column("enum", {
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  rol: UserRole;

  @Column("boolean", {
    default: false,
    nullable: false,
  })
  status: boolean;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  created_at: Date;
}
