import { Request, Response } from "express";

export class UserController {
  constructor() //TODO: Aca necesito llamar al servicio y hacer DI
  {}

  findAll = (req: Request, res: Response) => {
    return res.status(200).json({
      message: "Get request to the homepage from the user controller class",
    });
  };

  register = (req: Request, res: Response) => {
    return res.status(200).json({
      message:
        "Register request to the homepage from the user controller class",
    });
  };
}
