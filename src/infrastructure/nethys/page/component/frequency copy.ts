import { BOLD, HORIZONTAL_RULE, LINE_BREAK } from "../constants/elements";
import { NethysComponent } from "./pattern";
import { isStillParagraphContent } from "./pattern/still-content";

export class Frequency extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == BOLD,
                (node) => node.textContent == "Frequency"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                let currentFrequency = "";

                object.frequencies = object.triggers || []; ''

                while (currentNode && isStillParagraphContent(currentNode) && ![HORIZONTAL_RULE, LINE_BREAK].includes(currentNode.nodeName)) {
                    if (currentNode.textContent?.trim() == ",") {
                        object.frequencies.push(currentFrequency.trim().replace(";", ""));
                        currentFrequency = "";
                    } else {
                        currentFrequency += currentNode.textContent;
                    }

                    currentNode = currentNode.nextSibling;
                }

                if (currentFrequency != "")
                    object.frequencies.push(currentFrequency.trim().replace(";", ""));

                return currentNode;
            }
        )
    }

}

export const frequency = new Frequency();