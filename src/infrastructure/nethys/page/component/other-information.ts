import { TITLE } from "../constants/classes";
import { HEADING_2 } from "../constants/elements";
import { NethysComponent } from "./pattern";

export class OtherInformation extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_2,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => !!node.textContent?.trim().includes("Other Information")
            ]
        )
    }

}

export const otherInformation = new OtherInformation();