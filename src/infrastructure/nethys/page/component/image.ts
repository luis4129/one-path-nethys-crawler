import { ANCHOR } from "../constants/elements";
import { HREF, TARGET } from "../constants/attributes";
import { NethysComponent } from "./pattern";

class Image extends NethysComponent {

    constructor() {
        super([
            (node) => node.nodeName == ANCHOR,
            (node) => (node as HTMLElement).getAttribute(TARGET) == "_blank",
            (node) => (node as HTMLElement).getAttribute(HREF)?.startsWith("Image") || false
        ])
    }

}

export const image = new Image();