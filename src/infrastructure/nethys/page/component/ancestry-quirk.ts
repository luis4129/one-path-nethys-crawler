import { ObjectId } from "mongodb";
import { Description, Quirk } from "../../../../application/domain/documents";
import { TITLE } from "../constants/classes";
import { HEADING_2 } from "../constants/elements";
import { NethysObject } from "../object";
import { actionContainer } from "./action-container";
import { actionSubSection } from "./action-sub-section";
import { ListSections } from "./list-section";
import { ParagraphSections } from "./paragraph-section";
import { paragraphText } from "./paragraph-text";
import { NethysComponent } from "./pattern";
import { isWithinSkippableSections } from "./skippable-section";

export const AncestryQuirks = [
    "Low-Light Vision", "Darkvision", "Keen Eyes", "Hydration", "Aquatic Adaptation", "Claws", "Change Shape", "Fangs",
    "Undeath", "Wings", "Constructed", "Flammable", "Clan Dagger", "Empathic Sense", "Glowing Horn", "Emotionally Unaware",
    "Bite", "Land on Your Feet", "Plant Nourishment", "Unusual Anatomy", "Sharp Beak", "Innate Venom", "Draconic Exemplar",
    "Eyes in Back", "Magical Strikes", "Sunlight Healing", "Automaton Core", "Constructed Body", "Blunt Snout", "Photosynthesis",
    "Prehensile Tail"
]

export class AncestryQuirk extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == HEADING_2,
                (node) => (node as HTMLElement).className == TITLE,
                (node) => !!node.textContent?.trim(),
                (node) => {
                    const textContent = node.textContent?.trim() as string;
                    const isWithinList = AncestryQuirks.includes(textContent);
                    if (!isWithinList && !ParagraphSections.includes(textContent) && !ListSections.includes(textContent) && !isWithinSkippableSections(textContent)) console.log("QuirkBoons was not found within the list:", textContent);
                    return isWithinList
                }
            ],
            (node, object) => {
                const quirk = {
                    name: node.textContent?.trim() as string,
                    descriptions: [] as Array<Description>
                } as Quirk;

                let currentNode = paragraphText.setParagraphDescriptions(node.nextSibling, quirk.descriptions);

                if (currentNode) {
                    const isActionContainer = actionContainer.isComponent(currentNode);
                    const isActionSubSection = actionSubSection.isComponent(currentNode);

                    if (isActionContainer || isActionSubSection) {

                        const grantedAction = new NethysObject();

                        if (isActionContainer) {
                            actionSubSection.setGrantedAction(currentNode.firstChild as ChildNode, grantedAction);
                            currentNode = currentNode.nextSibling;
                        } else {
                            currentNode = actionSubSection.setGrantedAction(currentNode as ChildNode, grantedAction)
                        }

                        if (grantedAction.name) {
                            quirk.actions = quirk.actions || [];
                            quirk.actions.push(grantedAction.presetId as ObjectId)
                        }

                        object.grantedActions = object.grantedActions || [];
                        object.grantedActions?.push(grantedAction);
                    }

                }

                object.quirks = object.quirks || [];
                object.quirks.push(quirk);
                return currentNode;
            }
        )
    }

}

export const ancestryQuirk = new AncestryQuirk();