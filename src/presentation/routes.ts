import { Request, Response, Router } from 'express';
import { UserRoutes } from './users/routes';
import { DoctorRoutes } from './doctors/routes';
import { SpeciesRoutes } from './species/routes';
import { PetRoutes } from './pets/routes';
import { AppointmentsRoute } from './appointments/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/health-check', (req: Request, res: Response) => {
      res.status(200).json({ message: 'API is healthy' });
    });
    router.use('/api/users', UserRoutes.routes);
    router.use('/api/doctors', DoctorRoutes.routes);
    router.use('/api/species', SpeciesRoutes.routes);
    router.use('/api/pets', PetRoutes.routes);
    router.use('/api/appointments', AppointmentsRoute.routes);

    return router;
  }
}
