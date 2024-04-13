import { AbilityType } from "../../../../application/domain/documents";
import { TITLE } from "../constants/classes";
import { HEADING_2 } from "../constants/elements";
import { NethysComponent } from "./pattern";

export class AbilityFlaws extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_2,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => node.textContent?.trim() === "Ability Flaw(s)"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                object.abilityFlaws = object.abilityFlaws || [];

                while (currentNode && currentNode.nodeName != HEADING_2) {
                    const abilityName: string = currentNode.textContent?.trim() || "";

                    if (Object.values(AbilityType).includes(abilityName as AbilityType)) {
                        object.abilityFlaws.push(abilityName as AbilityType);
                    }

                    currentNode = currentNode.nextSibling;
                }

                return currentNode;
            }
        )
    }

}

export const abilityFlaws = new AbilityFlaws();