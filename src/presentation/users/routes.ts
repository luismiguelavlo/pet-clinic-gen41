import { Request, Response, Router } from "express";
import { UserController } from "./controller";
import { FinderUsersService } from "./services/finder-users.service";
import { RegisterUserService } from "./services/register-user.service";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const finderUsers = new FinderUsersService();
    const registerUser = new RegisterUserService();

    const controller = new UserController(registerUser, finderUsers);

    router.get("/", controller.findAll);
    router.post("/register", controller.register);
    router.get("/:id", controller.findOne);
    router.patch("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
  }
}
