import { encriptAdapter } from '../../../config';
import { User } from '../../../data/postgres/models/user.model';
import { CustomError, RegisterUserDto } from '../../../domain';

export class RegisterUserService {
  async execute(userData: RegisterUserDto) {
    const user = new User();

    user.fullname = userData.fullname;
    user.email = userData.email;
    user.password = this.encriptPassword(userData.password);
    user.phone_number = userData.phone_number;

    try {
      await user.save();
      return {
        message: 'User created successfully',
      };
    } catch (error: any) {
      this.throwException(error);
    }
  }

  private throwException(error: any) {
    if (error.code === '23505') {
      throw CustomError.conflict('Email already in use');
    }

    if (error.code === '22P02') {
      throw CustomError.unprocessableEntity('Invalid data type');
    }

    throw CustomError.internalServer('Error trying to create user');
  }

  private encriptPassword(password: string): string {
    return encriptAdapter.hash(password);
  }
}
