import { TITLE } from "../constants/classes";
import { HEADING_1 } from "../constants/elements";
import { NethysComponent } from "./pattern";

export class MechanicsTitle extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_1,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => !!node.textContent?.trim().includes("Mechanics")
            ]
        )
    }

}

export const mechanicsTitle = new MechanicsTitle();