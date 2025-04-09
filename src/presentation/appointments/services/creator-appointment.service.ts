import { envs } from '../../../config';
import { Appointment } from '../../../data/postgres/models/appointment.model';
import { User } from '../../../data/postgres/models/user.model';
import { CustomError } from '../../../domain';
import { CreateAppointmentDto } from '../../../domain/dtos/appointment/create-appointment.dto';
import { FinderDoctorService } from '../../doctors/services/finder-doctor.service';
import { FinderPetService } from '../../pets/services/finder-pet.service';
import moment from 'moment';

export class CreatorAppointmentService {
  constructor(
    private readonly finderPetService: FinderPetService,
    private readonly finderDoctorService: FinderDoctorService
  ) {}

  async execute(appointmentData: CreateAppointmentDto) {
    //primero vamos a buscar el usuario doctor
    const userPromise = this.finderDoctorService.execute(
      appointmentData.userId
    ); //este es el doctor
    //buscar la mascota
    const petPromise = this.finderPetService.execute(appointmentData.petId);
    //buscar si el medico tiene agenda para esa fecha y hora

    const formatDate = moment(appointmentData.date).format(
      'YYYY-MM-DD h:mm:ss'
    );

    const appointmentExistPromise = this.ensureAppointmentExist(
      appointmentData,
      formatDate
    );

    const [user, pet] = await Promise.all([
      userPromise,
      petPromise,
      appointmentExistPromise,
    ]);

    //crear el registro en bd
    const newAppointment = new Appointment();

    newAppointment.date = appointmentData.date;
    newAppointment.reason = appointmentData.reason;
    newAppointment.user = user!;
    newAppointment.pet = pet;

    try {
      await newAppointment.save();
      return {
        message: 'appointment registered successfully',
      };
    } catch (error) {
      if (envs.ENABLED_DEBUG) {
        console.log(error);
      }
      throw CustomError.internalServer('Error create appointment');
    }
  }

  private async ensureAppointmentExist(
    appointmentData: CreateAppointmentDto,
    formatDate: string
  ) {
    const appointment = await Appointment.createQueryBuilder('appointment')
      .where('appointment.doctor_user_id = :userId', {
        userId: appointmentData.userId,
      })
      .andWhere('appointment.date = :appointmentDate', {
        appointmentDate: formatDate,
      })
      .getOne();

    if (appointment) {
      throw CustomError.badRequest('appointment date already in use');
    }
  }
}
