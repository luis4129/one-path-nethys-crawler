import { Collection } from 'mongodb';
import { database } from './config';
import { Feat } from '../../application/domain/documents';

class FeatRepository {
    private collection: Collection<Feat>;

    constructor() {
        this.collection = database.collection("feats");
    }

    public async save(feats: Array<Feat>) {
        return this.collection.insertMany(feats);
    }

    public async delete() {
        return this.collection.deleteMany({});
    }
}

export const featRepository = new FeatRepository();