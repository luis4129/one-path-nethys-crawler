import { TITLE } from "../constants/classes";
import { HEADING_2 } from "../constants/elements";
import { NethysComponent } from "./pattern";

export class HitPoints extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_2,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => node.textContent?.trim() === "Hit Points"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;

                object.hitPoints = parseInt(currentNode?.textContent?.trim() || "");

                return currentNode?.nextSibling || null;
            }
        )
    }

}

export const hitPoints = new HitPoints();