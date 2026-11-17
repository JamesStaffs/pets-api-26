import { Pet, CreatePetDto } from './pet.types';

export class PetRepository {
    private pets: Pet[] = [];
    private nextPetId = 1;

    findAll(): Pet[] {
        return this.pets;
    }

    findById(id: number): Pet | undefined {
        return this.pets.find(pet => pet.id === id);
    }

    findByName(name: string): Pet[] {
        name = name.trim().toLowerCase();
        return this.pets.filter(
            pet => pet.name.toLowerCase() === name
        );
    }

    create(data: CreatePetDto): Pet {
        const pet: Pet = {
            id: this.nextPetId++,
            ...data
        };

        this.pets.push(pet);
        return pet;
    }

    update(pet: Pet): Pet {
        const index = this.pets.findIndex(
            existingPet => existingPet.id === pet.id
        );

        if (index === -1) {
            throw new Error(`Pet ${pet.id} does not exist`);
        }

        this.pets[index] = pet;
        return pet;
    }

    delete(id: number): boolean {
        const index = this.pets.findIndex(pet => pet.id === id);

        if (index === -1) {
            return false;
        }

        this.pets.splice(index, 1);

        return true;
    }
}