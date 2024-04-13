import { Feat, Rarity } from "../../../application/domain/documents";
import { OriginType } from "../../../application/domain/documents/origin-type";
import { EntityWithAction, getGrantedActions, getGrantedActionsIds } from "../action/to-action-document";
import { FEATS_URI } from "../page/constants/routes";
import fetchNethysObject from "../page/object";

export default async function fetchFeat(id: string): Promise<EntityWithAction<Feat>> {
    const nethysObject = await fetchNethysObject(`${FEATS_URI}?ID=${id}`);
    const grantedActions = getGrantedActions(nethysObject, OriginType.Feat);

    if (!nethysObject.name ||
        !nethysObject.level ||
        !nethysObject.traits ||
        !nethysObject.sources ||
        !nethysObject.descriptions.length
    ) {
        console.log(nethysObject)
        throw new Error("Feat is missing data for required properties");
    }

    if (nethysObject.hitPoints ||
        nethysObject.size ||
        nethysObject.speed ||
        nethysObject.abilityBoosts ||
        nethysObject.grantedLanguages ||
        nethysObject.abilityBoosts ||
        nethysObject.abilityFlaws ||
        nethysObject.grantedLanguages ||
        nethysObject.selectableLanguages ||
        nethysObject.quirks
    ) {
        console.log(nethysObject)
        throw new Error("Found unexpected property in feat NethisObject");
    }

    return {
        entity: {
            level: nethysObject.level,
            name: nethysObject.name,
            rarity: nethysObject.rarity || Rarity.Common,
            traits: nethysObject.traits,
            archetypes: nethysObject.archetypes,
            sources: nethysObject.sources,
            access: nethysObject.access,
            prerequisites: nethysObject.prerequisites,
            descriptions: nethysObject.descriptions,
            pfsNote: nethysObject.pfsNote,
            grantedActions: getGrantedActionsIds(grantedActions)
        },
        grantedActions: grantedActions || []

    };
}
