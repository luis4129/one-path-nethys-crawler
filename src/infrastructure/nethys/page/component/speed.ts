import { Speed } from "../../../../application/domain/documents/speed";
import { TITLE } from "../constants/classes";
import { HEADING_2, LINE_BREAK } from "../constants/elements";
import { NethysComponent } from "./pattern";

const SpeedType = [
    "Default",
    "Fly",
    "Swim"
]

export class SpeedComponent extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_2,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => node.textContent?.trim() === "Speed"
            ],
            (node, object) => {
                let currentNode = node.nextSibling;
                object.speed = object.speed || {} as Speed;

                while (currentNode && (currentNode.nodeName == LINE_BREAK || currentNode.textContent?.includes("feet"))) {
                    const text = currentNode?.textContent?.trim();
                    if (text) {
                        const firstWord = text.split(" ")[0];
                        const speedType = (SpeedType.includes(firstWord) ? firstWord : SpeedType[0]).toLowerCase();
                        const speed = text.match(/[0-9][0-9]/g)?.toString() || "";

                        object.speed[speedType as keyof Speed] = parseInt(speed);
                    }
                    currentNode = currentNode.nextSibling;
                }

                return currentNode;
            }
        )
    }

}

export const speed = new SpeedComponent();