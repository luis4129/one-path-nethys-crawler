import { TITLE } from "../constants/classes";
import { HEADING_1, HEADING_2 } from "../constants/elements";
import { NethysComponent } from "./pattern";

const SkippableSectionsRegex = [
    /Traits/,
    /Archetype Use/,
    /.*Leads To\.\.\.$/
]

export const isWithinSkippableSections = (textContent: string): boolean => {
    return SkippableSectionsRegex.some(regex => regex.test(textContent));
}

export class SkippableSection extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_2,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => isWithinSkippableSections(node.textContent?.trim() || "")
            ],
            undefined,
            (node) => {
                let currentNode = node.nextSibling as ChildNode | null;
                while (currentNode && ![HEADING_2, HEADING_1].includes(currentNode.nodeName)) {
                    currentNode = currentNode.nextSibling;
                }
                return currentNode;
            }
        )
    }

}

export const skippableSection = new SkippableSection();