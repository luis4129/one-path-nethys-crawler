import { BOLD, HORIZONTAL_RULE, LINE_BREAK } from "../constants/elements";
import { NethysComponent } from "./pattern";

export class Prerequisites extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == BOLD,
                (node) => node.textContent == "Prerequisites"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                let currentPrerequisite = "";

                object.prerequisites = object.prerequisites || []; ''

                while (currentNode && ![HORIZONTAL_RULE, LINE_BREAK].includes(currentNode.nodeName)) {
                    if (currentNode.textContent?.trim() == ",") {
                        object.prerequisites.push(currentPrerequisite.trim());
                        currentPrerequisite = "";
                    } else {
                        currentPrerequisite += currentNode.textContent;
                    }

                    currentNode = currentNode.nextSibling;
                }

                if (currentPrerequisite != "")
                    object.prerequisites.push(currentPrerequisite.trim());

                return currentNode;
            }
        )
    }

}

export const prerequisites = new Prerequisites();