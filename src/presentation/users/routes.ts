import { Request, Response, Router } from "express";
import { UserController } from "./controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new UserController();

    router.get("/", controller.findAll);
    router.post("/register", controller.register);
    router.get("/:id", controller.findOne);
    router.patch("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
  }
}
