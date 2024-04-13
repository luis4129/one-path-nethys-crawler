import { AbilityType } from "../../../../application/domain/documents";
import { TITLE } from "../constants/classes";
import { HEADING_2 } from "../constants/elements";
import { NethysComponent } from "./pattern";

export class AbilityBoosts extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_2,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => node.textContent?.trim() == "Ability Boosts"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                object.abilityBoosts = object.abilityBoosts || [];

                while (currentNode && currentNode.nodeName != HEADING_2) {
                    const abilityName: string = currentNode.textContent?.trim() || "";

                    if (Object.values(AbilityType).includes(abilityName as AbilityType)) {
                        object.abilityBoosts.push(abilityName as AbilityType);
                    } else if (abilityName == "Two free ability boosts") {
                        object.abilityBoosts.push(AbilityType.Any);
                        object.abilityBoosts.push(AbilityType.Any);
                    }

                    currentNode = currentNode.nextSibling;
                }

                return currentNode;
            }
        )
    }

}

export const abilityBoosts = new AbilityBoosts();