import { HORIZONTAL_RULE, LINE_BREAK, UNDERLINE } from "../constants/elements";
import { NethysComponent } from "./pattern";

export class PfsNote extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == UNDERLINE,
                (node) => node.textContent == "PFS Note"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                let pfsNote = "";

                while (currentNode && ![HORIZONTAL_RULE, LINE_BREAK].includes(currentNode.nodeName)) {
                    pfsNote += currentNode.textContent;
                    currentNode = currentNode.nextSibling;
                }

                object.pfsNote = pfsNote.trim();
                return currentNode;
            }
        )
    }

}

export const pfsNote = new PfsNote();