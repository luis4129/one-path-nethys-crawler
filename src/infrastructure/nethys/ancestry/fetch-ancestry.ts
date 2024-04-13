import { Ancestry, Rarity } from "../../../application/domain/documents";
import { Action } from "../../../application/domain/documents/action";
import { OriginType } from "../../../application/domain/documents/origin-type";
import { getGrantedActions } from "../action/to-action-document";
import { ANCESTRIES_URI } from "../page/constants/routes";
import fetchNethysObject from "../page/object";

export type NethysAncestryResponse = {
    id: string,
    ancestry: Ancestry,
    grantedActions: Array<Action>
}

export default async function fetchAncestry(id: string): Promise<NethysAncestryResponse> {
    const nethysObject = await fetchNethysObject(`${ANCESTRIES_URI}?ID=${id}`);
    const grantedActions = getGrantedActions(nethysObject, OriginType.Ancestry);

    if (!nethysObject.name ||
        !nethysObject.sources ||
        !nethysObject.hitPoints ||
        !nethysObject.size ||
        !nethysObject.speed ||
        !nethysObject.abilityBoosts ||
        !nethysObject.grantedLanguages ||
        !nethysObject.traits ||
        !nethysObject.descriptions.length
    ) {
        console.log(nethysObject)
        throw new Error("Ancestry is missing data for required properties");
    }

    return {
        id: id,
        ancestry: {
            name: nethysObject.name,
            rarity: nethysObject.rarity || Rarity.Common,
            traits: nethysObject.traits,
            sources: nethysObject.sources,
            descriptions: nethysObject.descriptions,
            hitPoints: nethysObject.hitPoints,
            size: nethysObject.size,
            speed: nethysObject.speed,
            abilities: {
                boosts: nethysObject.abilityBoosts,
                flaws: nethysObject.abilityFlaws
            },
            languages: {
                granted: nethysObject.grantedLanguages,
                selectable: nethysObject.selectableLanguages
            },
            quirks: nethysObject.quirks
        },
        grantedActions: grantedActions || []
    };
}