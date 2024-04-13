import { ActionType } from "../../../../application/domain/documents/action-type";
import { HREF, STYLE } from "../constants/attributes";
import { ACTION, TITLE } from "../constants/classes";
import { ANCHOR, HEADING_1, SPAN } from "../constants/elements";
import { mechanicsTitle } from "./mechanics-title";
import { NethysComponent } from "./pattern";
import { versatileHeritageSection } from "./versatile-heritage-section";

type NethyActionType = Record<string, ActionType>;

export const NethysActionTypes: NethyActionType = {
    "[one-action]": ActionType.OneAction,
    "[two-actions]": ActionType.TwoActions,
    "[three-actions]": ActionType.ThreeActions,
    "[reaction]": ActionType.Reaction,
    "[free-action]": ActionType.FreeAction
};

export class MainTitle extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_1,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => !mechanicsTitle.isComponent(node),
                (node) => !versatileHeritageSection.isComponent(node)
            ],
            (node, object) => {
                const name = (node as Element).querySelector(`${ANCHOR}[${HREF}*="?ID="]`)?.textContent?.trim();
                const actions = (node as Element).querySelector(`${SPAN.toLowerCase()}.${ACTION}`)?.textContent?.trim() || "";
                const level = (node as Element).querySelector(`${SPAN}[${STYLE}="margin-left:auto; margin-right:0"]`)?.textContent?.trim().match(/\d.*/g)?.toString();

                if (name) object.name = name;
                if (level) object.level = parseInt(level);

                if (Object.keys(NethysActionTypes).includes(actions))
                    object.actionType = NethysActionTypes[actions];

                return node.nextSibling;
            }
        )
    }

}

export const mainTitle = new MainTitle();