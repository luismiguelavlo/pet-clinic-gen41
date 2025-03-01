import { Router } from "express";
import { UserRoutes } from "./users/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/users", UserRoutes.routes);
    //router.use("/pets", PetRoutes.routes);

    return router;
  }
}
