import { CALLED_ACTION } from "../constants/classes";
import { DIVISION } from "../constants/elements";
import { NethysObject } from "../object";
import { actionSubSection } from "./action-sub-section";
import { NethysComponent } from "./pattern";

export class ActionContainer extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == DIVISION,
                (node) => (node as HTMLElement).className == CALLED_ACTION
            ], (node, object) => {
                const grantedAction = new NethysObject();
                actionSubSection.setGrantedAction(node.firstChild as ChildNode, grantedAction);

                object.grantedActions = object.grantedActions || [];
                object.grantedActions?.push(grantedAction);
                return node.nextSibling;
            }
        )
    }

}

export const actionContainer = new ActionContainer();