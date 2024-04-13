import { fetchBatch } from "../config/fetch";
import { Action } from "../../../application/domain/documents/action";
import fetchAction from "./fetch-action";

export default async function fetchActions(ids: Array<string>): Promise<Array<Action>> {
    return fetchBatch(fetchAction, ids);
}