import express, { type Express, type Request, type Response } from 'express';
import { PetSqliteRepository } from './pets/pet.repository-sqlite';
import { PetController } from './pets/pet.controller';
import { createPetRoutes } from './pets/pet.routes';

const app: Express = express();
const port: number = 3900;

const petRepository = new PetSqliteRepository('pets.sqlite3');
const petController = new PetController(petRepository);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!!');
});

app.use('/pets', createPetRoutes(petController));

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});