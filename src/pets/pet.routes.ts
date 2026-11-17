import { Router } from 'express';
import { PetController } from './pet.controller';

export function createPetRoutes(
    petController: PetController
): Router {
    const router = Router();
    
    router.get('/', petController.getAllPets);
    router.get('/search', petController.searchPets);
    router.get('/:id', petController.getPetById);
    router.post('/', petController.createPet);
    router.patch('/:id', petController.updatePet);
    router.put('/:id', petController.replacePet);
    router.delete('/:id', petController.deletePet);

    return router;
}