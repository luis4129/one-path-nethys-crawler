import { BOLD, HORIZONTAL_RULE, LINE_BREAK } from "../constants/elements";
import { NethysComponent } from "./pattern";

export class Access extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == BOLD,
                (node) => node.textContent == "Access"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                let currentAccess = "";

                object.access = object.access || []; ''

                while (currentNode && ![HORIZONTAL_RULE, LINE_BREAK].includes(currentNode.nodeName)) {
                    if (currentNode.textContent?.trim() == ",") {
                        object.access.push(currentAccess.trim());
                        currentAccess = "";
                    } else {
                        currentAccess += currentNode.textContent;
                    }

                    currentNode = currentNode.nextSibling;
                }

                if (currentAccess != "")
                    object.access.push(currentAccess.trim());

                return currentNode;
            }
        )
    }

}

export const access = new Access();