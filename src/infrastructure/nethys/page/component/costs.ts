import { BOLD, HORIZONTAL_RULE, LINE_BREAK } from "../constants/elements";
import { NethysComponent } from "./pattern";
import { isStillParagraphContent } from "./pattern/still-content";

export class Cost extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == BOLD,
                (node) => node.textContent == "Cost"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                let currentCost = "";

                object.costs = object.costs || []; ''

                while (currentNode && isStillParagraphContent(currentNode) && ![HORIZONTAL_RULE, LINE_BREAK].includes(currentNode.nodeName)) {
                    if (currentNode.textContent?.trim() == ",") {
                        object.costs.push(currentCost.trim());
                        currentCost = "";
                    } else {
                        currentCost += currentNode.textContent;
                    }

                    currentNode = currentNode.nextSibling;
                }

                if (currentCost != "")
                    object.costs.push(currentCost.trim());

                return currentNode;
            }
        )
    }

}

export const cost = new Cost();