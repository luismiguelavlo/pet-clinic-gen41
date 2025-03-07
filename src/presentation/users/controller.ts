import { Request, Response } from 'express';
import { RegisterUserService } from './services/register-user.service';
import { FinderUsersService } from './services/finder-users.service';
import { FinderUserService } from './services/finder-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';

export class UserController {
  constructor(
    private readonly registerUser: RegisterUserService,
    private readonly finderUsers: FinderUsersService,
    private readonly finderUser: FinderUserService,
    private readonly updateUser: UpdateUserService,
    private readonly deleteUser: DeleteUserService
  ) {}

  findAll = (req: Request, res: Response) => {
    this.finderUsers
      .execute()
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json({ message: err.message }));
  };

  register = (req: Request, res: Response) => {
    this.registerUser
      .execute(req.body)
      .then((message) => res.status(201).json(message))
      .catch((err) => res.status(500).json({ message: err.message }));
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderUser
      .execute(id)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json({ message: err.message }));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;

    this.updateUser
      .execute(id, req.body)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json({ message: err.message }));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.deleteUser
      .execute(id)
      .then(() => res.status(204).json(null))
      .catch((err) => res.status(500).json({ message: err.message }));
  };
}
