import { ObjectId } from "mongodb";
import { ACTION } from "../constants/classes";
import { ANCHOR, BOLD, LINE_BREAK, SPAN } from "../constants/elements";
import { NethysObject, setObjectProperties } from "../object";
import { NethysActionTypes } from "./main-title";
import { NethysComponent } from "./pattern";
import { HREF } from "../constants/attributes";
import { TRAITS_URI } from "../constants/routes";
import { ActionType } from "../../../../application/domain/documents/action-type";
import { DescriptionType } from "../../../../application/domain/documents/descriptions/description-type";

const ActivitiesWithoutIconRegex = [
    /\bPsychometric Assessment$/,
    /\bSettle Emotions$/,
    /\bAssume a Role$/,
    /\bActivate$/,
    /\bExhale Poison$/
];

const PostActionName = [
    "Fire in the Hole",
    "Mark for Death",
    "Upstage",
    "Eldritch Shot"
]

const ActionWithoutTraitsRegex = [
    /\bMark for Death$/,
    /\bUpstage$/,
    /\bFire in the Hole$/,
    /\bShootist's Draw$/,
    /\bEntity's Resurgence$/,
    /\bSlayer's Identification$/,
    /\bStonestrike Stance$/,
    /\bCoughing Dragon$/,
    /\bAnchor$/,
    /\bSpellsling$/,
    /\bEldritch Shot$/,
    /\bDragon Breath$/,
    /\bActivate$/,
    /\bJumping Jenny$/,
    /\bLay Down Arms$/,
    /\bStitching Strike$/,
    /\bShatter Glass$/,
    /\bBanshee Cry$/,
    /\bSpiritual Aid$/,
    /\bPatron’s Claim$/,
    /\bProtector's Interdiction$/,
    /\bBlizzard Evasion$/,
]

export class ActionProperty extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == BOLD,
                (node) => {
                    const nextElement = (node as Element).nextElementSibling;
                    const isActionIconNext = nextElement?.nodeName == SPAN && nextElement?.className == ACTION;

                    const textContent = node.textContent?.trim() || "";
                    const isActivityWithoutIcon = ActivitiesWithoutIconRegex.some(regex => regex.test(textContent));

                    return isActionIconNext || isActivityWithoutIcon;
                }
            ], (node, object) => {
                const grantedAction = new NethysObject();
                grantedAction.presetId = new ObjectId();
                grantedAction.name = node.textContent?.trim();

                let currentNode = (node as Element).nextElementSibling?.className == ACTION ?
                    (node as Element).nextElementSibling :
                    node.nextSibling;

                //Action Type
                if (currentNode?.nodeName == SPAN) {
                    if (currentNode?.nextSibling?.textContent?.trim() == "to") {
                        grantedAction.actionType = ActionType.Flexible;
                        currentNode = currentNode.nextSibling?.nextSibling?.nextSibling || null;
                    } else {
                        const actionText = currentNode?.textContent?.trim();

                        if (actionText && Object.keys(NethysActionTypes).includes(actionText))
                            grantedAction.actionType = NethysActionTypes[actionText];

                        currentNode = currentNode.nextSibling;
                    }
                }

                //Post Action Name
                const postActionText = currentNode?.textContent?.trim().replace(";", "") || "";
                if (PostActionName.includes(postActionText)) {
                    grantedAction.name = postActionText;
                    currentNode = currentNode?.nextSibling || null;
                } else if (postActionText == "Interact") {
                    grantedAction.actionType = ActionType.OneAction;
                    grantedAction.traits = grantedAction.traits || [];
                    grantedAction.traits.push("Manipulate");
                }

                //Traits
                if (["(", "(see below); ("].includes(currentNode?.textContent?.trim() || "")) {
                    while (currentNode && !currentNode?.textContent?.trim().startsWith(")")) {
                        const textContent = currentNode?.textContent?.trim();
                        if (textContent && currentNode.nodeName == ANCHOR && (currentNode as Element).getAttribute(HREF)?.startsWith(TRAITS_URI)) {
                            grantedAction.traits = grantedAction.traits || [];
                            grantedAction.traits.push(this.capitalizeTrait(textContent));
                        }
                        currentNode = currentNode.nextSibling;
                    }
                    const textWithoutParenthesis = currentNode?.textContent?.replace(")", "").trim();
                    if (!!textWithoutParenthesis) grantedAction.descriptions.push({ type: DescriptionType.Paragraph, value: { description: textWithoutParenthesis } });
                    currentNode = currentNode?.nextSibling || null;
                } else if (currentNode?.textContent?.trim() == "(envision), or a different activation if otherwise specified;") {
                    grantedAction.traits = grantedAction.traits || [];
                    grantedAction.traits.push(this.capitalizeTrait("envision"));
                    currentNode = currentNode?.nextSibling || null;
                } else if (currentNode?.textContent?.trim().startsWith("(") && currentNode.textContent.trim().endsWith(")")) {
                    grantedAction.traits = grantedAction.traits || [];
                    grantedAction.traits.push(...currentNode?.textContent?.trim().split(",").map(trait => this.capitalizeTrait(trait.trim())));
                    currentNode = currentNode?.nextSibling || null;
                } else if (!ActionWithoutTraitsRegex.some(regex => regex.test(grantedAction.name || ""))) {
                    console.log(`Action ${grantedAction.name} didn't have traits`, currentNode?.textContent?.trim());
                }

                setObjectProperties(currentNode, grantedAction, undefined, (currentNode) => currentNode.nodeName != LINE_BREAK);

                object.grantedActions = object.grantedActions || [];
                object.grantedActions?.push(grantedAction);
                return currentNode;
            }
        )
    }

    capitalizeTrait(trait: string) {
        return trait.split(" ").map(word => this.capitalizeFirstLetter(word)).join(" ");
    }

    capitalizeFirstLetter(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

}

export const actionProperty = new ActionProperty();