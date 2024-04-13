import { TITLE } from "../constants/classes";
import { HEADING_2 } from "../constants/elements";
import { NethysComponent } from "./pattern";

export class Size extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_2,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => node.textContent?.trim() === "Size"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;

                object.size = currentNode?.textContent?.trim();

                return currentNode?.nextSibling || null;
            }
        )
    }

}

export const size = new Size();