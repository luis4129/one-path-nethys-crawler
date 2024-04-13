import { ANCESTRIES_URI, VERSATILE_HERITAGES_URI } from "../page/constants/routes";
import fetchListIds from "../page/list-ids";

export default async function fetchVersatileHeritageIds(): Promise<Array<string>> {
    return fetchListIds(VERSATILE_HERITAGES_URI, ANCESTRIES_URI);
}