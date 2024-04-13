import { Rarity } from "../../../../application/domain/documents";
import { RARE_TRAIT, TRAIT, UNCOMMON_TRAIT, UNIQUE_TRAIT, ARCHIVES_OF_NETHYS_TRAIT } from "../constants/classes";
import { SPAN } from "../constants/elements";
import { NethysComponent } from "./pattern";

class Trait extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == SPAN,
                (node) => [TRAIT, UNCOMMON_TRAIT, RARE_TRAIT, UNIQUE_TRAIT, ARCHIVES_OF_NETHYS_TRAIT].includes((node as HTMLElement).className)
            ],
            (node, object) => {
                const element = node as HTMLElement;
                if (element.textContent) {
                    if (Object.values(Rarity).includes(element.textContent as Rarity)) {
                        object.rarity = element.textContent as Rarity;
                    } else {
                        object.traits = object.traits || [];
                        object.traits.push(element.textContent.trim())
                    }
                }
                return node.nextSibling;
            }
        )
    }

}

export const trait = new Trait();