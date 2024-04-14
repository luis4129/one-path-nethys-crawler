import { DescriptionProperty } from "../../../../application/domain/documents";
import { FRAMING } from "../constants/classes";
import { HEADING_3 } from "../constants/elements";
import { paragraphProperty } from "./paragraph-property";
import { NethysComponent } from "./pattern";

const ParagraphFramings = [
    "Command",
    "Envision",
    "Interact",
    "Cast a Spell"
]

export class ParagraphFraming extends NethysComponent {

    constructor() {
        super(
            [
                (node) => [HEADING_3].includes(node.nodeName),
                (node) => (node as Element).className == FRAMING,
                (node) => !!node.textContent?.trim(),
                (node) => {
                    const textContent = node.textContent?.trim() as string;
                    const isWithinList = ParagraphFramings.includes(textContent);
                    if (!isWithinList) console.log("ParagraphFraming was not found within the list:", textContent);
                    return isWithinList
                }
            ],
            (node, object) => this.setDescriptionFraming(node, object.descriptions)
        )
    }

    setDescriptionFraming(node: ChildNode, parentDescription: Array<DescriptionProperty>): ChildNode | null {
        return paragraphProperty.setDescriptionProperty(node, parentDescription);
    }

}

export const paragraphFraming = new ParagraphFraming();