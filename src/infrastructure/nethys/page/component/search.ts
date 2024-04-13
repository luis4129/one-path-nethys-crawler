import { NETHYS_SEARCH, SPAN } from "../constants/elements";
import { NethysComponent } from "./pattern";

class Search extends NethysComponent {

    constructor() {
        super([
            (node) => node.nodeName == NETHYS_SEARCH
        ])
    }

}

export const search = new Search();