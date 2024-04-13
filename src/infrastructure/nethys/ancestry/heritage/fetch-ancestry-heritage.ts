import { Heritage } from "../../../../application/domain/documents";
import { Rarity } from "../../../../application/domain/documents";
import { EntityWithAction, getGrantedActions, getGrantedActionsIds } from "../../action/to-action-document";
import { HERITAGES_URI } from "../../page/constants/routes";
import fetchNethysObject from "../../page/object";
import { OriginType } from "../../../../application/domain/documents/origin-type";

export default async function fetchAncestryHeritage(heritageIdAndAncestryName: Record<string, string>): Promise<EntityWithAction<Heritage>> {
    const heritageId = Object.keys(heritageIdAndAncestryName)[0];
    const ancestryName = heritageIdAndAncestryName[heritageId];

    const nethysObject = await fetchNethysObject(`${HERITAGES_URI}?ID=${heritageId}`);
    const grantedActions = getGrantedActions(nethysObject, OriginType.AncestryHeritage);

    if (!nethysObject.name ||
        !nethysObject.sources ||
        !nethysObject.descriptions.length
    ) {
        console.log(nethysObject)
        throw new Error("Ancestry Heritage is missing data for required properties");
    }

    return {
        entity: {
            name: nethysObject.name,
            ancestry: ancestryName,
            rarity: nethysObject.rarity || Rarity.Common,
            traits: nethysObject.traits,
            sources: nethysObject.sources,
            descriptions: nethysObject.descriptions,
            grantedActions: getGrantedActionsIds(grantedActions)
        },
        grantedActions: grantedActions || []
    };
}