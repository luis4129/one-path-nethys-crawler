import { ANCESTRIES_URI } from "../page/constants/routes";
import fetchListIds from "../page/list-ids";

export default async function fetchAncestryIds(): Promise<Array<string>> {
    return fetchListIds(ANCESTRIES_URI, ANCESTRIES_URI);
}