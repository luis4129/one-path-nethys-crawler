import { TITLE } from "../constants/classes";
import { HEADING_1, HEADING_2, HEADING_3 } from "../constants/elements";
import { NethysComponent } from "./pattern";

export const SkippableSubSections = [
    /Feats Requiring .*/
]

export const isWithinSkippablSubSections = (textContent: string): boolean => {
    return SkippableSubSections.some(regex => regex.test(textContent));
}

export class SkippableSubSection extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_3,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => isWithinSkippablSubSections(node.textContent?.trim() || "")
            ],
            undefined,
            (node) => {
                let currentNode = node.nextSibling as ChildNode | null;
                while (currentNode && ![HEADING_3, HEADING_2, HEADING_1].includes(currentNode.nodeName)) {
                    currentNode = currentNode.nextSibling;
                }
                return currentNode;
            }
        )
    }

}

export const skippableSubSection = new SkippableSubSection();