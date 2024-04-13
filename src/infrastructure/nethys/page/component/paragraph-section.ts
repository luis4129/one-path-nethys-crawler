import { Description } from "../../../../application/domain/documents";
import { TITLE } from "../constants/classes";
import { HEADING_2 } from "../constants/elements";
import { AncestryQuirks } from "./ancestry-quirk";
import { ListSections } from "./list-section";
import { paragraphText } from "./paragraph-text";
import { NethysComponent } from "./pattern";
import { isWithinSkippableSections } from "./skippable-section";
import { spoilerSection } from "./spoiler-section";

export const ParagraphSections = [
    "Adventurers",
    "Alignment and Religion",
    "Physical Description",
    "Names",
    "Society",
    "Learned Spells"
]

export class ParagraphSection extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_2,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => !!node.textContent?.trim(),
                (node) => {
                    const textContent = node.textContent?.trim() as string;
                    const isWithinList = ParagraphSections.includes(textContent);
                    if (!isWithinList && !ListSections.includes(textContent) && !AncestryQuirks.includes(textContent) && !isWithinSkippableSections(textContent) && !spoilerSection.isComponent(node)) console.log("ParagraphSection was not found within the list:", textContent);
                    return isWithinList
                }
            ],
            (node, object) => {
                const label = node.textContent?.trim() as string;
                const property = {
                    label: label == "Alignment and Religion" ? "Beliefs" : label,
                    descriptions: [] as Array<Description>
                }

                const currentNode = paragraphText.setParagraphDescriptions(node.nextSibling, property.descriptions);
                object.descriptions.push(property);
                return currentNode;
            }
        )
    }

}

export const paragraphSection = new ParagraphSection();