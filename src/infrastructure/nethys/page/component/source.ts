import { BOLD, HORIZONTAL_RULE, LINE_BREAK } from "../constants/elements";
import { NethysComponent } from "./pattern";

export class Source extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == BOLD,
                (node) => node.textContent == "Source"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                let currentSource = "";

                object.sources = object.sources || [];

                while (currentNode && ![HORIZONTAL_RULE, LINE_BREAK].includes(currentNode.nodeName)) {
                    if (currentNode.textContent?.trim() == ",") {
                        object.sources.push(currentSource.split(" pg")[0].trim());
                        currentSource = "";
                    } else {
                        currentSource += currentNode.textContent;
                    }

                    currentNode = currentNode.nextSibling;
                }

                if (currentSource != "")
                    object.sources.push(currentSource.split(" pg")[0].trim());

                return currentNode;
            }
        )
    }

}

export const source = new Source();