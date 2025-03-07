import { User } from '../../../data/postgres/models/user.model';

export class UpdateUserService {
  async execute(userId: string, userData: any) {
    const user = await this.ensureUserExists(userId);

    user.fullname = userData.fullname;
    user.email = userData.email;

    try {
      await user.save();
      return {
        message: 'User updated successfully',
      };
    } catch (error) {
      throw new Error('An error occurred while updating the user');
    }
  }

  private async ensureUserExists(userId: string): Promise<User> {
    const user = await User.findOne({
      select: ['id'],
      where: {
        id: userId,
        status: true,
      },
    });

    if (!user) {
      throw new Error(`User with id: ${userId} not found`);
    }

    return user;
  }
}
