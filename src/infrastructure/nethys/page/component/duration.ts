import { BOLD, HORIZONTAL_RULE, LINE_BREAK } from "../constants/elements";
import { NethysComponent } from "./pattern";
import { isStillPropertyContent } from "./pattern/still-content";

export class Duration extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == BOLD,
                (node) => node.textContent == "Duration"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                let currentDuration = "";

                object.durations = object.durations || []; ''

                while (currentNode && isStillPropertyContent(currentNode) && ![HORIZONTAL_RULE, LINE_BREAK].includes(currentNode.nodeName)) {
                    if (currentNode.textContent?.trim() == ",") {
                        object.durations.push(currentDuration.trim().replace(";", ""));
                        currentDuration = "";
                    } else {
                        currentDuration += currentNode.textContent;
                    }

                    currentNode = currentNode.nextSibling;
                }

                if (currentDuration != "")
                    object.durations.push(currentDuration.trim().replace(";", ""));

                return currentNode;
            }
        )
    }

}

export const duration = new Duration();