import { Pet, CreatePetDto } from './pet.types';

export interface PetRepository {
    findAll(): Pet[];

    findById(id: number): Pet | undefined;

    findByName(name: string): Pet[];

    create(data: CreatePetDto): Pet;

    update(pet: Pet): Pet;

    delete(id: number): boolean;
}
