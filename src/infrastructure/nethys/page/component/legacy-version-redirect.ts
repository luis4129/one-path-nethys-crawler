import { DIVISION } from "../constants/elements";
import { NethysComponent } from "./pattern";

class LegacyVersionRedirect extends NethysComponent {

    constructor() {
        super([
            (node) => node.nodeName == DIVISION,
            (node) => node.textContent == "There is a Legacy version here."
        ])
    }

}

export const legacyVersionRedirect = new LegacyVersionRedirect();