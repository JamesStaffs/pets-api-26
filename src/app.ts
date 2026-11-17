import express, { type Express, type Request, type Response } from 'express';
import { PetRepository } from './pets/pet.repository';
import { PetController } from './pets/pet.controller';
import { createPetRoutes } from './pets/pet.routes';

const app: Express = express();
const port: number = 3900;

const petRepository = new PetRepository();
const petController = new PetController(petRepository);

// Add some sample pet data
petRepository.create({
    name: "Fluffy",
    species: "Cat",
    adopted: true
});

petRepository.create({
    name: "Growler",
    species: "Dog",
    adopted: false
});

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!!');
});

app.use('/pets', createPetRoutes(petController));

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});