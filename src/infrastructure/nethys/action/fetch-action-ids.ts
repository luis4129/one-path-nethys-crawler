import { ACTIONS_URI, EXPLORATION_ACTIVITIES_URI, DOWNTIME_ACTIVITIES_URI } from "../page/constants/routes";
import fetchListIds from "../page/list-ids";

export default async function fetchActionIds(): Promise<Array<string>> {
    const actions = await fetchListIds(ACTIONS_URI, ACTIONS_URI);
    const explorationActivities = await fetchListIds(EXPLORATION_ACTIVITIES_URI, ACTIONS_URI);
    const downtimeActivities = await fetchListIds(DOWNTIME_ACTIVITIES_URI, ACTIONS_URI);
    return actions.concat(explorationActivities, downtimeActivities);
}