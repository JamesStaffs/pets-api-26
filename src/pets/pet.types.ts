import { z } from "zod";

import {
    PetSchema,
    CreatePetSchema,
    UpdatePetSchema,
    SearchPetSchema
} from "./pet.schema";

export type Pet = z.infer<typeof PetSchema>;
export type CreatePetDto = z.infer<typeof CreatePetSchema>;
export type UpdatePetDto = z.infer<typeof UpdatePetSchema>;
export type SearchPetDto = z.infer<typeof SearchPetSchema>;