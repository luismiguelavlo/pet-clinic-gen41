import { Router } from 'express';
import { CreatorPetService } from './services/creator-pet.service';
import { FinderPetsService } from './services/finder-pets.service';
import { PetController } from './controller';

export class PetRoutes {
  static get routes(): Router {
    const router = Router();

    const creatorPetService = new CreatorPetService();
    const finderPetsService = new FinderPetsService();

    const controller = new PetController(finderPetsService, creatorPetService);

    router.get('/', controller.findAll);
    router.post('/', controller.create);

    return router;
  }
}
