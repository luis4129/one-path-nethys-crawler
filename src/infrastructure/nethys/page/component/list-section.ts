import { Description } from "../../../../application/domain/documents";
import { TITLE } from "../constants/classes";
import { HEADING_2, UNORDERED_LIST } from "../constants/elements";
import { NethysComponent } from "./pattern";

export const ListSections = [
    "You Might...",
    "Others Probably..."
]

export class ListSection extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_2,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => ListSections.includes(node.textContent?.trim() || "")
            ],
            (node, object) => this.setListDescription(node, object.descriptions)
        )
    }

    setListDescription(node: ChildNode, parentDescriptions: Array<Description>) {
        const label = node.textContent?.trim() as string;
        const listElement = node.nextSibling;

        if (!listElement || listElement.nodeName != UNORDERED_LIST)
            throw new Error("DescriptionSectionTitle doesn't actually have a list");


        const lines = Array.from(listElement?.childNodes)
            .map(line => line.textContent?.trim() || "")
            .filter(line => line !== "")

        parentDescriptions.push({ label: label, descriptions: lines });
        return listElement.nextSibling;
    }

}

export const listSection = new ListSection();