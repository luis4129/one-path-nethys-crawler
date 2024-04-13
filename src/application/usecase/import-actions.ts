import { ImportResponse } from "../domain/dto";
import fetchActions from "../../infrastructure/nethys/action/fetch-actions";
import fetchActionIds from "../../infrastructure/nethys/action/fetch-action-ids";
import { actionRepository } from "../../infrastructure/mongodb/action-repository";
import { Action } from "../domain/documents/action";
import { OriginType } from "../domain/documents/origin-type";

export async function importActions(): Promise<ImportResponse> {
    const ids = await fetchActionIds();
    const allActions = await fetchActions(ids);
    const uniqueActions = Array.from(new Set(allActions.map(action => action.name))).map(actionName => allActions.find(action => action.name == actionName) as Action);

    await actionRepository.deleteByOrigin(OriginType.Action);
    const { acknowledged, insertedCount } = await actionRepository.save(uniqueActions);

    return { acknowledged, insertedCount, data: uniqueActions };
}



