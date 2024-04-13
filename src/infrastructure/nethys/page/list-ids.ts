import { STICKY_LEFT, TITLE, TRAIT } from "./constants/classes";
import { HEADING_2, SPAN, TABLE_DATA } from "./constants/elements";
import { ACTIONS_URI, ANCESTRIES_URI, DOWNTIME_ACTIVITIES_URI, EXPLORATION_ACTIVITIES_URI, FEATS_URI, HERITAGES_URI, TRAITS_URI, VERSATILE_HERITAGES_URI } from "./constants/routes";
import fetchPageContent from "./content";
import { IdNotFoundError } from "../../../application/domain/error";

type EntityElementKeys = Record<string, { elementTag: string, elementClass: string }>;
const Pages: EntityElementKeys = {
    [ACTIONS_URI]: {
        elementTag: HEADING_2,
        elementClass: TITLE
    },
    [EXPLORATION_ACTIVITIES_URI]: {
        elementTag: HEADING_2,
        elementClass: TITLE
    },
    [DOWNTIME_ACTIVITIES_URI]: {
        elementTag: HEADING_2,
        elementClass: TITLE
    },
    [HERITAGES_URI]: {
        elementTag: HEADING_2,
        elementClass: TITLE
    },
    [VERSATILE_HERITAGES_URI]: {
        elementTag: HEADING_2,
        elementClass: TITLE
    },
    [ANCESTRIES_URI]: {
        elementTag: HEADING_2,
        elementClass: TITLE
    },
    [TRAITS_URI]: {
        elementTag: SPAN,
        elementClass: TRAIT
    },
    [FEATS_URI]: {
        elementTag: TABLE_DATA,
        elementClass: STICKY_LEFT
    }
}

export default async function fetchListIds(uri: string, linkBaseUri: string): Promise<Array<string>> {
    const uriBase = uri.split("?Ancestry=")[0];
    const { elementTag, elementClass } = Pages[uriBase as keyof EntityElementKeys];

    return fetchPageContent(uri).then(async content => {
        const titlesWithLinks = Array.from(content.querySelectorAll(`${elementTag.toLowerCase()}.${elementClass} > a[href^="${linkBaseUri}"]`));

        return await Promise.all(titlesWithLinks.map(titleElement =>
            titleElement.getAttribute("href")?.split("=")[1] || Promise.reject(new IdNotFoundError(uri, titleElement.outerHTML)))
        )
    });
}