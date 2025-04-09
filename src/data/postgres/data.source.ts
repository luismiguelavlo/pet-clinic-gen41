import { DataSource } from 'typeorm';
import { envs } from '../../config';
import { Appointment } from './models/appointment.model';
import { Doctor } from './models/doctor.model';
import { Pet } from './models/pet.model';
import { Specie } from './models/specie.model';
import { User } from './models/user.model';

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const options: Options = {
  host: envs.DATABASE_HOST,
  port: envs.DATABASE_PORT,
  username: envs.DATABASE_USERNAME,
  password: envs.DATABASE_PASSWORD,
  database: envs.DATABASE_NAME,
};

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: options.host,
  port: options.port,
  username: options.username,
  password: options.password,
  database: options.database,
  synchronize: false,
  migrationsRun: true,
  entities: [Appointment, Doctor, Pet, Specie, User],
  migrations: [__dirname + '/migrations/*.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
});
