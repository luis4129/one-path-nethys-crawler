import { ImportResponse } from "../domain/dto";
import { ancestryRepository } from "../../infrastructure/mongodb/ancestry-repository";
import { heritageRepository } from "../../infrastructure/mongodb/heritage-repository";
import { actionRepository } from "../../infrastructure/mongodb/action-repository";
import { fetchAncestryIds, fetchAncestries } from "../../infrastructure/nethys/ancestry";
import fetchAncestryHeritageIds from "../../infrastructure/nethys/ancestry/heritage/fetch-ancestry-heritage-ids";
import fetchAncestryHeritages from "../../infrastructure/nethys/ancestry/heritage/fetch-ancestry-heritages";
import { OriginType } from "../domain/documents/origin-type";

export async function importAncestries(): Promise<ImportResponse> {
    const ids = await fetchAncestryIds();
    const ancestriesResponses = await fetchAncestries(ids);
    const ancestries = ancestriesResponses.map(ancestryResponse => ancestryResponse.ancestry);

    const ancestryHeritageIds = Array.from(new Set((await fetchAncestryHeritageIds(ancestriesResponses)).flat()));
    const heritagesResponses = await fetchAncestryHeritages(ancestryHeritageIds);
    const heritages = heritagesResponses.map(response => response.entity);

    const ancestryGrantedActions = ancestriesResponses.map(response => response.grantedActions);
    const heritageGrantedActions = heritagesResponses.map(response => response.grantedActions);
    const grantedActions = [...ancestryGrantedActions, ...heritageGrantedActions].flat();

    await actionRepository.deleteByOrigin(OriginType.Ancestry);
    await actionRepository.deleteByOrigin(OriginType.AncestryHeritage);
    await ancestryRepository.delete();
    await heritageRepository.deleteAncestry();

    const actionsResult = await actionRepository.save(grantedActions);
    const heritagesResult = await heritageRepository.save(heritages);
    const ancestriesResult = await ancestryRepository.save(ancestries);

    return {
        acknowledged: ancestriesResult.acknowledged && heritagesResult.acknowledged && actionsResult.acknowledged,
        insertedCount: ancestriesResult.insertedCount,
        data: [ancestries, heritages, grantedActions]
    };
}



