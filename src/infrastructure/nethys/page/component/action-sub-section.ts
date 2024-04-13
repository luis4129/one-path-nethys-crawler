import { ObjectId } from "mongodb";
import { mainTitle } from "./main-title";
import { NethysComponent } from "./pattern";
import { ACTION, TITLE } from "../constants/classes";
import { HEADING_3, SPAN } from "../constants/elements";
import { NethysObject, setObjectProperties } from "../object";
import { isStillSubSectionContent } from "./pattern/still-content";

export class ActionSubSection extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_3,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => !!(node as HTMLElement).querySelector(`${SPAN.toLowerCase()}.${ACTION}`)
            ], (node, object) => {
                const grantedAction = new NethysObject();
                this.setGrantedAction(node, grantedAction);

                object.grantedActions = object.grantedActions || [];
                object.grantedActions?.push(grantedAction);
                return null;
            }
        )
    }

    setGrantedAction(node: ChildNode, grantedAction: NethysObject) {
        let currentNode = mainTitle.setComponentProperties(node, grantedAction);
        grantedAction.presetId = new ObjectId();
        setObjectProperties(currentNode, grantedAction, undefined, isStillSubSectionContent);
        return node;
    }

}

export const actionSubSection = new ActionSubSection();