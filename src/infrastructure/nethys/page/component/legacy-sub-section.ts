import { TITLE } from "../constants/classes";
import { HEADING_3 } from "../constants/elements";
import { NethysComponent } from "./pattern";

export class LegacySubSection extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_3,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => node.textContent?.trim() == "Legacy Content"
            ]
        )
    }

}

export const legacySubSection = new LegacySubSection();