import { Request, Response } from "express";
import { RegisterUserService } from "./services/register-user.service";
import { FinderUsersService } from "./services/finder-users.service";

export class UserController {
  constructor(
    private readonly registerUser: RegisterUserService,
    private readonly finderUsers: FinderUsersService
  ) {}

  findAll = (req: Request, res: Response) => {
    this.finderUsers
      .execute()
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json({ message: err.message }));
  };

  register = (req: Request, res: Response) => {
    this.registerUser
      .execute()
      .then((message) => res.status(201).json(message))
      .catch((err) => res.status(500).json({ message: err.message }));
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;
    return res.status(200).json({
      id: id,
      message:
        "Find one request to the homepage from the user controller class",
    });
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    return res.status(200).json({
      id: id,
      message: "Update request to the homepage from the user controller class",
    });
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    return res.status(200).json({
      id: id,
      message: "Delete request to the homepage from the user controller class",
    });
  };
}
