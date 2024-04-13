import { TITLE } from "../constants/classes";
import { HEADING_2 } from "../constants/elements";
import { NethysComponent } from "./pattern";

const SPOILER_TEXT_REGEX = /This .* may contain spoilers from the /;

export class SpoilerSection extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_2,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => SPOILER_TEXT_REGEX.test(node.textContent?.trim() || "")
            ]
        )
    }

}

export const spoilerSection = new SpoilerSection();