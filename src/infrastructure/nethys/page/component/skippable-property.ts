import { BOLD, HEADING_1, HEADING_2, HEADING_3, HORIZONTAL_RULE, LINE_BREAK } from "../constants/elements";
import { NethysComponent } from "./pattern";

const SkippableProperties = [
    "Related Feats",
    "Source"
]

export class SkippableProperty extends NethysComponent {

    constructor() {
        super(
            [
                (node) => [BOLD].includes(node.nodeName),
                (node) => SkippableProperties.includes(node.textContent?.trim() || "")
            ],
            undefined,
            (node) => {
                let currentNode = node.nextSibling as ChildNode | null;
                while (currentNode && ![HEADING_3, HEADING_2, HEADING_1, BOLD, LINE_BREAK, HORIZONTAL_RULE].includes(currentNode.nodeName)) {
                    currentNode = currentNode.nextSibling;
                }
                return currentNode;
            }
        )
    }
}

export const skippableProperty = new SkippableProperty();