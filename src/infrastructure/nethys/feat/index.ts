import { Feat } from "../../../application/domain/documents";
import { EntityWithAction } from "../action/to-action-document";
import { fetchBatch } from "../config/fetch";
import fetchFeat from "./fetch-feat";

export default async function fetchFeats(ids: Array<string>): Promise<Array<EntityWithAction<Feat>>> {
    return fetchBatch(fetchFeat, ids);
}