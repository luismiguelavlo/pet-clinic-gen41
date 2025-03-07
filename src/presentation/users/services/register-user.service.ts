import { User } from '../../../data/postgres/models/user.model';

export class RegisterUserService {
  async execute(userData: any) {
    const user = new User();

    user.fullname = userData.fullname;
    user.email = userData.email;
    user.password = userData.password;
    user.phone_number = userData.phone_number;
    user.rol = userData.rol;

    try {
      await user.save();
      return {
        message: 'User created successfully',
      };
    } catch (error) {
      console.log(error);
      throw new Error('An error occurred while registering the user');
    }
  }
}
