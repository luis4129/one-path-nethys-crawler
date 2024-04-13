import { ImportResponse } from "../domain/dto";
import fetchFeats from "../../infrastructure/nethys/feat";
import fetchFeatIds from "../../infrastructure/nethys/feat/fetch-feat-ids";
import { featRepository } from "../../infrastructure/mongodb/feat-repository";
import { actionRepository } from "../../infrastructure/mongodb/action-repository";
import { OriginType } from "../domain/documents/origin-type";


export async function importFeats(): Promise<ImportResponse> {
    const ids = fetchFeatIds();
    const featsResponse = await fetchFeats(ids);
    const feats = featsResponse.map(response => response.entity);
    const grantedActions = featsResponse.map(response => response.grantedActions).flat();

    await actionRepository.deleteByOrigin(OriginType.Feat);
    await featRepository.delete()

    const actionsResult = await actionRepository.save(grantedActions);
    const featsResults = await featRepository.save(feats);

    return {
        acknowledged: actionsResult.acknowledged && featsResults.acknowledged,
        insertedCount: featsResults.insertedCount,
        data: [feats, grantedActions]
    };
}



