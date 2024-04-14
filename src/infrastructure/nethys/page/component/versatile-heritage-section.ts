import { DescriptionProperty } from "../../../../application/domain/documents";
import { TITLE } from "../constants/classes";
import { BOLD, HEADING_1, HEADING_2, LINE_BREAK } from "../constants/elements";
import { paragraphText } from "./paragraph-text";
import { NethysComponent } from "./pattern";

const skipUntilSectionTitle = (currentNode: ChildNode | null) => {
    while (currentNode && !(currentNode.nodeName == HEADING_2 && (currentNode as Element).className == TITLE)) {
        currentNode = currentNode.nextSibling;
    }
    return currentNode;
}

const skipUntilAncestryPage = (currentNode: ChildNode | null) => {
    while (currentNode && !(currentNode.nodeName == BOLD && currentNode.textContent?.trim() == "Ancestry Page")) {
        currentNode = currentNode.nextSibling;
    }
    return currentNode;
}

const skipPastAncestryPage = (currentNode: ChildNode | null) => {
    while (currentNode && currentNode.nodeName != LINE_BREAK) {
        currentNode = currentNode.nextSibling;
    }
    return currentNode;
}

export class VersatileHeritageSection extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_1,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => node.textContent?.trim() == "Versatile Heritage"
            ], (node, object) => {
                let currentNode = skipUntilSectionTitle(node.nextSibling);

                const quirk = {
                    name: currentNode?.textContent?.trim() as string,
                    descriptions: [] as Array<DescriptionProperty>
                };

                currentNode = skipUntilAncestryPage(currentNode);
                currentNode = skipPastAncestryPage(currentNode);
                currentNode = paragraphText.setParagraphDescriptions(currentNode, quirk.descriptions);

                object.quirks = object.quirks || [];
                object.quirks.push(quirk);
                return currentNode;
            }
        )
    }

}

export const versatileHeritageSection = new VersatileHeritageSection();