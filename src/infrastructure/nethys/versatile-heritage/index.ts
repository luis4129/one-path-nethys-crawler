import { Heritage } from "../../../application/domain/documents";
import { EntityWithAction } from "../action/to-action-document";
import { fetchBatch } from "../config/fetch";
import fetchVersatileHeritage from "./fetch-versatile-heritage";

export default async function fetchVersatileHeritages(ids: Array<string>): Promise<Array<EntityWithAction<Heritage>>> {
    return fetchBatch(fetchVersatileHeritage, ids);
}