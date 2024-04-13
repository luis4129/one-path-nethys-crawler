import { SPAN } from "../constants/elements";
import { NethysComponent } from "./pattern";

class Space extends NethysComponent {

    constructor() {
        super([
            (node) => node.nodeName == SPAN,
            (node) => (node as HTMLElement).innerHTML == "&nbsp;"
        ])
    }

}

export const space = new Space();