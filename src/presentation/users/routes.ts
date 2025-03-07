import { Request, Response, Router } from 'express';
import { UserController } from './controller';
import { FinderUsersService } from './services/finder-users.service';
import { RegisterUserService } from './services/register-user.service';
import { FinderUserService } from './services/finder-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const finderUsers = new FinderUsersService();
    const registerUser = new RegisterUserService();
    const finderUser = new FinderUserService();
    const updateUser = new UpdateUserService();
    const deleteUser = new DeleteUserService();

    const controller = new UserController(
      registerUser,
      finderUsers,
      finderUser,
      updateUser,
      deleteUser
    );

    router.get('/', controller.findAll);
    router.post('/register', controller.register);
    router.get('/:id', controller.findOne);
    router.patch('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
