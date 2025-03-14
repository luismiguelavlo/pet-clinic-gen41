import { Request, Response, Router } from 'express';
import { UserController } from './controller';
import { FinderUsersService } from './services/finder-users.service';
import { RegisterUserService } from './services/register-user.service';
import { FinderUserService } from './services/finder-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { LoginUserService } from './services/login-user.service';
import { EmailService } from '../common/services/email.service';
import { envs } from '../../config';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_MAIL
    );

    const finderUsers = new FinderUsersService();
    const registerUser = new RegisterUserService(emailService);
    const finderUser = new FinderUserService();
    const updateUser = new UpdateUserService();
    const deleteUser = new DeleteUserService();
    const loginUser = new LoginUserService();

    const controller = new UserController(
      registerUser,
      finderUsers,
      finderUser,
      updateUser,
      deleteUser,
      loginUser
    );

    router.get('/', controller.findAll);
    router.post('/register', controller.register);
    router.get('/:id', controller.findOne);
    router.patch('/:id', controller.update);
    router.delete('/:id', controller.delete);
    router.post('/login', controller.login);
    router.get('/validate-account/:token', controller.validateAccount);

    return router;
  }
}
