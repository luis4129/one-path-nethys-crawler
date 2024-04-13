import { HEADING_2, LINE_BREAK } from "../constants/elements";
import { NethysComponent } from "./pattern";

class LineBreak extends NethysComponent {

    constructor() {
        super([
            (node) => [LINE_BREAK, HEADING_2].includes(node.nodeName),
            (node) => !node.textContent?.trim()
        ])
    }

}

export const lineBreak = new LineBreak();