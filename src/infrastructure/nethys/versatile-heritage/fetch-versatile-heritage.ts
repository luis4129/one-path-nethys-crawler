import { Heritage, Rarity } from "../../../application/domain/documents";
import { EntityWithAction, getGrantedActions, getGrantedActionsIds } from "../action/to-action-document";
import { ANCESTRIES_URI } from "../page/constants/routes";
import fetchNethysObject from "../page/object";
import { OriginType } from "../../../application/domain/documents/origin-type";

export default async function fetchVersatileHeritage(id: string): Promise<EntityWithAction<Heritage>> {
    const nethysObject = await fetchNethysObject(`${ANCESTRIES_URI}?ID=${id}`);
    const grantedActions = getGrantedActions(nethysObject, OriginType.VersatileHeritage);

    if (!nethysObject.name ||
        !nethysObject.sources ||
        !nethysObject.traits ||
        !nethysObject.descriptions.length ||
        !nethysObject.quirks?.length
    ) {
        console.log(nethysObject)
        throw new Error("Ancestry is missing data for required properties");
    }

    return {
        entity: {
            name: nethysObject.name,
            rarity: nethysObject.rarity || Rarity.Common,
            traits: nethysObject.traits,
            sources: nethysObject.sources,
            descriptions: nethysObject.descriptions,
            grantedActions: getGrantedActionsIds(grantedActions)
        },
        grantedActions: grantedActions || []
    };
}