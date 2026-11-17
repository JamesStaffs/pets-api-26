import Database from 'better-sqlite3';
import { Pet, CreatePetDto } from './pet.types';

export class PetSqliteRepository {
    private readonly db: Database.Database

    constructor(private readonly dbFilePath: string) {
        this.db = new Database(this.dbFilePath);

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS pets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                species TEXT NOT NULL,
                adopted INTEGER NOT NULL
            )
        `);
    }

    findAll(): Pet[] {
        return this.db
            .prepare('SELECT * FROM pets')
            .all() as Pet[];
    }

    findById(id: number): Pet | undefined {
        return this.db
            .prepare('SELECT * FROM pets WHERE id = ?')
            .get(id) as Pet | undefined;
    }

    findByName(name: string): Pet[] {
        return this.db
            .prepare(`
                SELECT * FROM pets
                WHERE LOWER(name) = LOWER(?)
            `)
            .all(name.trim()) as Pet[];
    }

    create(data: CreatePetDto): Pet {
        const result = this.db
            .prepare(`
                INSERT INTO pets (name, species, adopted)
                VALUES (?, ?, ?)
            `)
            .run(
                data.name,
                data.species,
                data.adopted ? 1 : 0
            );

        return {
            id: Number(result.lastInsertRowid),
            ...data
        };
    }

    update(pet: Pet): Pet {
        const result = this.db
            .prepare(`
                UPDATE pets
                SET name = ?, species = ?, adopted = ?
                WHERE id = ?
            `)
            .run(
                pet.name,
                pet.species,
                pet.adopted ? 1 : 0,
                pet.id
            );

        if (result.changes === 0) {
            throw new Error(`Pet ${pet.id} does not exist`);
        }

        return pet;
    }

    delete(id: number): boolean {
        const result = this.db
            .prepare('DELETE FROM pets WHERE id = ?')
            .run(id);

        return result.changes > 0;
    }
}