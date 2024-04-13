import { Collection } from 'mongodb';
import { database } from './config';
import { Heritage } from '../../application/domain/documents';
import { exists } from 'fs';

class HeritageRepository {
    private collection: Collection<Heritage>;

    constructor() {
        this.collection = database.collection("heritages");
    }

    public async save(heritages: Array<Heritage>) {
        return this.collection.insertMany(heritages);
    }

    public async deleteAncestry() {
        return this.collection.deleteMany({ ancestry: { $exists: true } });
    }

    public async deleteVersatile() {
        return this.collection.deleteMany({ ancestry: { $exists: false } });
    }

    public async findAll() {
        return this.collection.find().toArray();
    }
}

export const heritageRepository = new HeritageRepository();