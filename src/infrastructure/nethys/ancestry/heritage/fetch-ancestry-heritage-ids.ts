import { fetchBatch } from "../../config/fetch";
import { HERITAGES_URI } from "../../page/constants/routes";
import fetchListIds from "../../page/list-ids";
import { NethysAncestryResponse } from "../fetch-ancestry";

const VersatileHeritageIds: Array<string> = [
    "84",
    "281",
    "118",
    "232",
    "119",
    "279",
    "83",
    "282",
    "85",
    "129",
    "130",
    "280",
    "131",
    "203",
    "132",
    "133",
    "233",
    "86",
    "134"
];

const fetchHeritageIdsWithAncestryName = async (ancestryResponse: NethysAncestryResponse): Promise<Array<Record<string, string>>> => {
    const ancestryId = ancestryResponse.id;
    const ancestryName = ancestryResponse.ancestry.name;

    const heritageIds = await fetchListIds(`${HERITAGES_URI}?Ancestry=${ancestryId}`, HERITAGES_URI);

    return heritageIds
        .filter(heritageId => !VersatileHeritageIds.includes(heritageId))
        .map(heritageId => {
            return { [heritageId]: ancestryName }
        });
}

export default async function fetchAncestryHeritageIds(ancestryResponse: Array<NethysAncestryResponse>): Promise<Array<Array<Record<string, string>>>> {
    return fetchBatch(fetchHeritageIdsWithAncestryName, ancestryResponse);
}