import { BOLD, HORIZONTAL_RULE, LINE_BREAK } from "../constants/elements";
import { NethysComponent } from "./pattern";
import { isStillPropertyContent } from "./pattern/still-content";

export class Effect extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == BOLD,
                (node) => node.textContent == "Effect"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                let currentEffect = "";

                object.effects = object.effects || []; ''

                while (currentNode && isStillPropertyContent(currentNode) && ![HORIZONTAL_RULE, LINE_BREAK].includes(currentNode.nodeName)) {
                    if (currentNode.textContent?.trim() == ",") {
                        object.effects.push(currentEffect.trim());
                        currentEffect = "";
                    } else {
                        currentEffect += currentNode.textContent;
                    }

                    currentNode = currentNode.nextSibling;
                }

                if (currentEffect != "")
                    object.effects.push(currentEffect.trim());

                return currentNode;
            }
        )
    }

}

export const effect = new Effect();