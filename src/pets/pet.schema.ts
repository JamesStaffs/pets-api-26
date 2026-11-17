import { z } from "zod";

export const PetSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().trim().min(1),
    species: z.string().trim().min(1),
    adopted: z.boolean()
});

export const CreatePetSchema = PetSchema.omit({
    id: true
});

export const UpdatePetSchema = CreatePetSchema.partial();

export const SearchPetSchema = z.object({
    name: PetSchema.shape.name
});
