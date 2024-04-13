import { Action } from "../../../application/domain/documents/action";
import { OriginType } from "../../../application/domain/documents/origin-type";
import { ACTIONS_URI } from "../page/constants/routes";
import fetchNethysObject from "../page/object";
import toActionDocument from "./to-action-document";

export default async function fetchAction(id: string): Promise<Action> {
    const nethysObject = await fetchNethysObject(`${ACTIONS_URI}?ID=${id}`);
    return toActionDocument(nethysObject, OriginType.Action);
}