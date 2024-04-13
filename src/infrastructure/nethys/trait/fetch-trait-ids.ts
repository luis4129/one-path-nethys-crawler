import { TRAITS_URI } from "../page/constants/routes";
import fetchListIds from "../page/list-ids";

export default async function fetchTraitIds(): Promise<Array<string>> {
    return fetchListIds(TRAITS_URI, TRAITS_URI);
}