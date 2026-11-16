import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
app.use(express.json());

const port: number = 3900;

const pets = [
    {
        id: 1,
        name: "Fluffy",
        species: "Cat",
        adopted: true,
    },
    {
        id: 2,
        name: "Growler",
        species: "Dog",
        adopted: false,
    },
];

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!!');
});

app.get('/pets', (req: Request, res: Response) => { 
    res.send(pets);
});

app.get('/pets/search', (req: Request, res: Response) => {
    const name = String(req.query.name ?? '').toLowerCase();

    const results = pets.filter(pet => pet.name.toLowerCase() === name);

    res.send(results);
});

app.get('/pets/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pet = pets.find(pet => pet.id === id);

    if (!pet) {
        return res.status(404).send({
            message: "Pet cannot be found with the specified ID"
        });
    }

    return res.send(pet);
});

app.post('/pets', (req: Request, res: Response) => {
    // TODO: Validation

    const lastPet = pets[pets.length - 1];
    const lastPetId = lastPet ? lastPet.id : 0;
    
    const pet = {
        id: lastPetId + 1,
        name: req.body.name,
        species: req.body.species,
        adopted: req.body.adopted
    };

    pets.push(pet);
    return res.status(201).send(pet);
});

app.patch('/pets/:id', (req: Request, res: Response) => { 
    const id = Number(req.params.id);
    const petIndex = pets.findIndex(pet => pet.id === id);

    if (petIndex === -1) {
        return res.status(400).send({
            message: "Pet cannot be found with the specified ID"
        });
    } 

    // TODO: validation 

    // Overwrite the current pet with the old details PLUS any new details
    const currentPet = pets[petIndex];
    const updatedPet = { 
        ...currentPet,
        name: req.body.name ?? currentPet.name,
        species: req.body.species ?? currentPet.species,
        adopted: req.body.adopted ?? currentPet.adopted,
    };

    pets[petIndex] = updatedPet;
    res.send(updatedPet); 
});

app.put('/pets/:id', (req: Request, res: Response) => { 
    const id = Number(req.params.id);
    const petIndex = pets.findIndex(pet => pet.id === id);

    if (petIndex === -1) { 
        return res.status(400).send({ 
            message: "Pet cannot be found with the specified ID"
        });
    } 

    // TODO: validation 

    // Replace the current pet with the new details
    const updatedPet = {
        ...pets[petIndex], // this is "currentPet" in the patch route
        name: req.body.name,
        species: req.body.species,
        adopted: req.body.adopted
    };

    pets[petIndex] = updatedPet;
    return res.send(updatedPet); 
});

app.delete('/pets/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const petIndex = pets.findIndex(pet => pet.id === id); 

    if (petIndex === -1) { 
        return res.status(400).send({
            message: 'Pet not found'
        });
    }

    pets.splice(petIndex, 1);

    return res.status(204).send();
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});