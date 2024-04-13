import { ObjectId } from "mongodb";
import { Action } from "../../../application/domain/documents/action";
import { OriginType } from "../../../application/domain/documents/origin-type";
import { NethysObject } from "../page/object";

export type EntityWithAction<T> = {
    entity: T,
    grantedActions: Array<Action>
}

export function getGrantedActions(nethysObject: NethysObject, origin: OriginType): Array<Action> | undefined {
    return nethysObject.grantedActions?.map(nethysAction => toActionDocument(nethysAction, origin));
}

export function getGrantedActionsIds(grantedActions: Array<Action> | undefined): Array<ObjectId> | undefined {
    return grantedActions?.map(action => action._id as ObjectId);
}

export default function toActionDocument(nethysObject: NethysObject, origin: OriginType): Action {
    if (!nethysObject.name ||
        (!nethysObject.descriptions.length && !nethysObject.effects?.length)
    ) {
        console.log(nethysObject)
        throw new Error("Action is missing data for required properties");
    }

    return {
        _id: nethysObject.presetId,
        origin: origin,
        name: nethysObject.name,
        type: nethysObject.actionType,
        traits: nethysObject.traits,
        sources: nethysObject.sources,
        costs: nethysObject.costs,
        frequencies: nethysObject.frequencies,
        requirements: nethysObject.requirements,
        durations: nethysObject.durations,
        effects: nethysObject.effects,
        trigger: nethysObject.triggers,
        descriptions: nethysObject.descriptions
    };
}