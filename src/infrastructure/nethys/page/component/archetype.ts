import { BOLD, HORIZONTAL_RULE, LINE_BREAK } from "../constants/elements";
import { NethysComponent } from "./pattern";

export class Archetype extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == BOLD,
                (node) => ["Archetype", "Archetypes"].includes(node.textContent || "")
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                let currentArchetype = "";

                object.archetypes = object.archetypes || []; ''

                while (currentNode && ![HORIZONTAL_RULE, LINE_BREAK].includes(currentNode.nodeName)) {
                    if ([",", ",*"].includes(currentNode.textContent?.trim() || "")) {
                        object.archetypes.push(currentArchetype.trim());
                        currentArchetype = "";
                    } else {
                        currentArchetype += currentNode.textContent;
                    }

                    currentNode = currentNode.nextSibling;
                }

                if (currentArchetype != "")
                    object.archetypes.push(currentArchetype.trim());

                return currentNode;
            }
        )
    }

}

export const archetype = new Archetype();