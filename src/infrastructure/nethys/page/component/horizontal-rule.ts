import { HORIZONTAL_RULE } from "../constants/elements";
import { NethysComponent } from "./pattern";

class HorizontalRule extends NethysComponent {

    constructor() {
        super([
            (node) => node.nodeName == HORIZONTAL_RULE
        ])
    }

}

export const horizontalRule = new HorizontalRule();