import { TEXT } from "../constants/node-types";
import { NethysComponent } from "./pattern";

export class EmptyText extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeType == TEXT,
                (node) => !node.textContent?.trim()
            ]
        )
    }

}

export const emptyText = new EmptyText();