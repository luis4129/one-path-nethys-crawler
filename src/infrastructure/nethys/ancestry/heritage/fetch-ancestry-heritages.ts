import { Heritage } from "../../../../application/domain/documents";
import { EntityWithAction } from "../../action/to-action-document";
import { fetchBatch } from "../../config/fetch";
import fetchAncestryHeritage from "./fetch-ancestry-heritage";

export default async function fetchAncestryHeritages(ancestryHeritageIds: Array<Record<string, string>>): Promise<Array<EntityWithAction<Heritage>>> {
    return fetchBatch(fetchAncestryHeritage, ancestryHeritageIds);
}