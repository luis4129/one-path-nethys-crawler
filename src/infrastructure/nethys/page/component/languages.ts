import { STYLE } from "../constants/attributes";
import { TITLE } from "../constants/classes";
import { HEADING_2 } from "../constants/elements";
import { ELEMENT } from "../constants/node-types";
import { NethysComponent } from "./pattern";

export class Languages extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_2,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => node.textContent?.trim() === "Languages"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;

                while (currentNode && currentNode.nodeName != HEADING_2) {
                    if (currentNode.nodeType == ELEMENT && currentNode.textContent) {
                        const element = currentNode as HTMLElement;
                        const isAutomatic = element.getAttribute(STYLE) != "text-decoration:underline";
                        const language = currentNode.textContent.trim();

                        if (isAutomatic) {
                            object.grantedLanguages = object.grantedLanguages || [];
                            object.grantedLanguages.push(language.trim());
                        } else {
                            object.selectableLanguages = object.selectableLanguages || [];
                            object.selectableLanguages.push(language.trim());
                        }
                    }

                    currentNode = currentNode.nextSibling;

                }

                return currentNode;
            }
        )
    }

}

export const languages = new Languages();