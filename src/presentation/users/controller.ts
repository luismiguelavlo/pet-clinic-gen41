import { Request, Response } from "express";

export class UserController {
  constructor() {} //TODO: Aca necesito llamar al servicio y hacer DI

  findAll = (req: Request, res: Response) => {
    return res.status(200).json({
      message: "Get request to the homepage from the user controller class",
    });
  };

  register = (req: Request, res: Response) => {
    console.log(req.body);
    return res.status(200).json({
      message:
        "Register request to the homepage from the user controller class",
    });
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
