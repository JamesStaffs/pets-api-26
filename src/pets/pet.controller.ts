import { Request, Response } from 'express';
import { PetRepository } from './pet.repository';
import { CreatePetSchema, SearchPetSchema, UpdatePetSchema } from './pet.schema';

export class PetController {
    constructor(
        private readonly petRepository: PetRepository
    ) {}

    getAllPets = (req: Request, res: Response) => {
        const pets = this.petRepository.findAll();
        return res.send(pets);
    };

    getPetById = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const pet = this.petRepository.findById(id);

        if (!pet) {
            return res.status(404).send({
                message: "Pet cannot be found with the specified ID"
            });
        }

        return res.send(pet);
    };

    searchPets = (req: Request, res: Response) => {
        const validate = SearchPetSchema.safeParse(req.query);
        if (!validate.success) {
            return res.status(400).send({
                message: "Invalid search parameters",
                errors: validate.error.issues
            });
        }   

        const name = validate.data.name;

        const results = this.petRepository.findByName(name);
        res.send(results);
    };

    createPet = (req: Request, res: Response) => {
        const validate = CreatePetSchema.safeParse(req.body);
        if (!validate.success) {
            return res.status(400).send({
                message: "Invalid request body",
                validation: validate.error.issues
            });
        }

        const pet = this.petRepository.create(validate.data);
        return res.status(201).send(pet);
    };

    updatePet = (req: Request, res: Response) => {
        const validate = UpdatePetSchema.safeParse(req.body);
        if (!validate.success) {
            return res.status(400).send({
                message: "Invalid request body",
                validation: validate.error.issues
            });
        }

        const id = Number(req.params.id);

        const existingPet = this.petRepository.findById(id);
        if (!existingPet) {
            return res.status(400).send({
                message: "Pet cannot be found with the specified ID"
            });
        }

        const pet = this.petRepository.update({
            ...existingPet,
            ...validate.data
        });

        return res.send(pet);
    };

    replacePet = (req: Request, res: Response) => {
        const validate = CreatePetSchema.safeParse(req.body);
        if (!validate.success) {
            return res.status(400).send({
                message: "Invalid request body",
                validation: validate.error.issues
            });
        }

        const id = Number(req.params.id);
        const pet = this.petRepository.update({
            id,
            ...validate.data
        });

        return res.send(pet);
    };

    deletePet = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const deleted = this.petRepository.delete(id);

        if (!deleted) {
            return res.status(400).send({
                message: 'Pet not found'
            });
        }

        return res.status(204).send();
    };
}