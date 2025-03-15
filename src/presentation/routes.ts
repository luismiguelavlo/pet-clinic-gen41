import { Router } from 'express';
import { UserRoutes } from './users/routes';
import { DoctorRoutes } from './doctors/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/users', UserRoutes.routes);
    router.use('/api/doctors', DoctorRoutes.routes);
    //router.use("/pets", PetRoutes.routes);

    return router;
  }
}
