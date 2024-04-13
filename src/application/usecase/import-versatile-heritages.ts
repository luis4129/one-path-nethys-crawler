import { ImportResponse } from "../domain/dto";
import { heritageRepository } from "../../infrastructure/mongodb/heritage-repository";
import fetchVersatileHeritageIds from "../../infrastructure/nethys/versatile-heritage/fetch-versatile-heritage-ids";
import fetchVersatileHeritages from "../../infrastructure/nethys/versatile-heritage";
import { actionRepository } from "../../infrastructure/mongodb/action-repository";
import { OriginType } from "../domain/documents/origin-type";

export async function importVersatileHeritages(): Promise<ImportResponse> {
    const versatileHeritageIds = await fetchVersatileHeritageIds();
    const versatileHeritagesResponse = await fetchVersatileHeritages(versatileHeritageIds);
    const versatileHeritages = versatileHeritagesResponse.map(response => response.entity);
    const grantedActions = versatileHeritagesResponse.map(response => response.grantedActions).flat();

    await actionRepository.deleteByOrigin(OriginType.VersatileHeritage);
    await heritageRepository.deleteVersatile()

    const actionsResult = await actionRepository.save(grantedActions);
    const heritageResult = await heritageRepository.save(versatileHeritages);

    return {
        acknowledged: actionsResult.acknowledged && heritageResult.acknowledged,
        insertedCount: heritageResult.insertedCount,
        data: [versatileHeritages, grantedActions]
    };
}



