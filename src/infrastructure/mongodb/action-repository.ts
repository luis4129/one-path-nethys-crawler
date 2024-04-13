import { Collection } from 'mongodb';
import { database } from './config';
import { Action } from '../../application/domain/documents/action';
import { OriginType } from '../../application/domain/documents/origin-type';

class ActionRepository {
    private collection: Collection<Action>;

    constructor() {
        this.collection = database.collection("actions");
    }

    public async save(actions: Array<Action>) {
        return this.collection.insertMany(actions);
    }

    public async deleteByOrigin(origin: OriginType) {
        return this.collection.deleteMany({ origin: origin });
    }
}

export const actionRepository = new ActionRepository();