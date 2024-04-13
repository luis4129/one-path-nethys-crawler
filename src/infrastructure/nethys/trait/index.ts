import { Trait } from "../../../application/domain/documents";
import { fetchBatch } from "../config/fetch";
import fetchTrait from "./fetch-trait";

export default async function fetchTraits(ids: Array<string>): Promise<Array<Trait>> {
    return fetchBatch(fetchTrait, ids);
}