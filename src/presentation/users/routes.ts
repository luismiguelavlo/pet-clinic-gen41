import { Request, Response, Router } from "express";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", (req: Request, res: Response) => {
      return res.status(200).json({
        message: "Get request to the homepage from the userRoutes class",
      });
    });

    return router;
  }
}
