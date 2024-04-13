import { BOLD, HORIZONTAL_RULE, LINE_BREAK } from "../constants/elements";
import { NethysComponent } from "./pattern";
import { isStillPropertyContent } from "./pattern/still-content";

export class Trigger extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == BOLD,
                (node) => node.textContent == "Trigger"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                let currentTrigger = "";

                object.triggers = object.triggers || []; ''

                while (currentNode && isStillPropertyContent(currentNode) && ![HORIZONTAL_RULE, LINE_BREAK].includes(currentNode.nodeName)) {
                    if (currentNode.textContent?.trim() == ",") {
                        object.triggers.push(currentTrigger.trim().replace(";", ""));
                        currentTrigger = "";
                    } else {
                        currentTrigger += currentNode.textContent;
                    }

                    currentNode = currentNode.nextSibling;
                }

                if (currentTrigger != "")
                    object.triggers.push(currentTrigger.trim().replace(";", ""));

                return currentNode;
            }
        )
    }

}

export const trigger = new Trigger();