import { fetchBatch } from "../config/fetch";
import fetchAncestry, { NethysAncestryResponse } from "./fetch-ancestry";

export default async function fetchAncestries(ids: Array<string>): Promise<Array<NethysAncestryResponse>> {
    return fetchBatch(fetchAncestry, ids);
}