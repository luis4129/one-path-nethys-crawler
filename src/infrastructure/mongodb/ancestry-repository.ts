import { Collection } from 'mongodb';
import { database } from './config';
import { Ancestry } from '../../application/domain/documents';

class AncestryRepository {
    private collection: Collection<Ancestry>;

    constructor() {
        this.collection = database.collection("ancestries");
    }

    public async save(ancestries: Array<Ancestry>) {
        return this.collection.insertMany(ancestries);
    }

    public async delete() {
        return this.collection.deleteMany({});
    }

    public async findById(id: string) {
        return this.collection.findOne({ _id: id });
    }
}

export const ancestryRepository = new AncestryRepository();