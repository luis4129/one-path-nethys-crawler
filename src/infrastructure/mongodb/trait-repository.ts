import { Collection } from 'mongodb';
import { database } from './config';
import { Trait } from '../../application/domain/documents';

class TraitRepository {
    private collection: Collection<Trait>;

    constructor() {
        this.collection = database.collection("traits");
    }

    public async save(traits: Array<Trait>) {
        return this.collection.insertMany(traits);
    }

    public async delete() {
        return this.collection.deleteMany({});
    }
}

export const traitRepository = new TraitRepository();