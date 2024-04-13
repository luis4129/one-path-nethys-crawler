import { BOLD, HORIZONTAL_RULE, LINE_BREAK } from "../constants/elements";
import { NethysComponent } from "./pattern";
import { isStillPropertyContent } from "./pattern/still-content";

export class Requirements extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == BOLD,
                (node) => ["Requirements", "Requirement"].includes(node.textContent?.trim() || "")
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                let currentRequirements = "";

                object.requirements = object.requirements || []; ''

                while (currentNode && isStillPropertyContent(currentNode) && ![HORIZONTAL_RULE, LINE_BREAK].includes(currentNode.nodeName)) {
                    if (currentNode.textContent?.trim() == ",") {
                        object.requirements.push(currentRequirements.trim().replace(";", ""));
                        currentRequirements = "";
                    } else {
                        currentRequirements += currentNode.textContent;
                    }

                    currentNode = currentNode.nextSibling;
                }

                if (currentRequirements != "")
                    object.requirements.push(currentRequirements.trim().replace(";", ""));

                return currentNode;
            }
        )
    }

}

export const requirements = new Requirements();