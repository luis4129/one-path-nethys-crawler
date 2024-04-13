import { Trait } from "../../../application/domain/documents";
import { TRAITS_URI } from "../page/constants/routes";
import fetchNethysObject from "../page/object";

export default async function fetchTrait(id: string): Promise<Trait> {
    const nethysObject = await fetchNethysObject(`${TRAITS_URI}?ID=${id}`);

    if (!nethysObject.name ||
        !nethysObject.sources ||
        !nethysObject.descriptions.length
    ) {
        console.log(nethysObject)
        throw new Error("Trait is missing data for required properties");
    }

    if (nethysObject.hitPoints ||
        nethysObject.size ||
        nethysObject.speed ||
        nethysObject.abilityBoosts ||
        nethysObject.grantedLanguages ||
        nethysObject.traits?.length
    ) {
        console.log(nethysObject)
        throw new Error("Found unexpected property in trait NethisObject");
    }

    return {
        name: nethysObject.name,
        sources: nethysObject.sources,
        descriptions: nethysObject.descriptions
    };
}