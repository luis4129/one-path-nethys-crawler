import { DescriptionProperty } from "../../../../application/domain/documents";
import { DescriptionType } from "../../../../application/domain/documents/descriptions/description-type";
import { ANCHOR, HEADING_1, ITALIC, LINE_BREAK } from "../constants/elements";
import { ELEMENT, TEXT } from "../constants/node-types";
import { listSection } from "./list-section";
import { paragraphFraming } from "./paragraph-framing";
import { paragraphProperty } from "./paragraph-property";
import { paragraphSection } from "./paragraph-section";
import { paragraphSubSection } from "./paragraph-sub-section";
import { NethysComponent } from "./pattern";
import { isStillSectionContent } from "./pattern/still-content";
import { skippableProperty } from "./skippable-property";
import { skippableSubSection } from "./skippable-sub-section";

export const isAnotherComponent = (currentNode: ChildNode): boolean => currentNode.nodeName == HEADING_1 || paragraphSection.isComponent(currentNode) || paragraphSubSection.isComponent(currentNode) || paragraphFraming.isComponent(currentNode) || paragraphProperty.isComponent(currentNode);

export class ParagraphText extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeType == TEXT || (
                    node.nodeType == ELEMENT && (
                        node.nodeName == ITALIC || (
                            node.nodeName == ANCHOR && (
                                node.firstChild?.nodeType == TEXT ||
                                node.firstChild?.nodeName == ITALIC
                            )
                        )
                    )
                ),
                (node) => !!node.textContent?.trim()
            ],
            (node, object) => this.setParagraphDescriptions(node as ChildNode | null, object.descriptions)
        )
    }

    setParagraphDescriptions(nodeParam: ChildNode | null, descriptions: Array<DescriptionProperty>): ChildNode | null {
        let currentParagraph: string | undefined;
        let currentNode: ChildNode | null = nodeParam;

        while (currentNode && isStillSectionContent(currentNode)) {
            const currentText = currentNode.textContent;
            const isSubSection = paragraphSubSection.isComponent(currentNode);
            const isSkippableSubSection = skippableSubSection.isComponent(currentNode);
            const isFraming = paragraphFraming.isComponent(currentNode);
            const isProperty = paragraphProperty.isComponent(currentNode);
            const isSkippableProperty = skippableProperty.isComponent(currentNode);
            const isList = listSection.isComponent(currentNode);
            const isLineBreak = currentNode.nodeName == LINE_BREAK;

            if (currentParagraph && (isSubSection || isFraming || isProperty || isList || isLineBreak)) {
                this.processAncestryIntros(currentParagraph).forEach(description => descriptions.push({ type: DescriptionType.Paragraph, value: { description: description } }));
                currentParagraph = undefined;
            }

            if (isSkippableSubSection) {
                currentNode = skippableSubSection.skipComponent(currentNode);
            } else if (isSubSection) {
                currentNode = paragraphSubSection.setDescriptionSubSection(currentNode, descriptions);
            } else if (isFraming) {
                currentNode = paragraphFraming.setDescriptionFraming(currentNode, descriptions);
            } else if (isSkippableProperty) {
                currentNode = skippableProperty.skipComponent(currentNode);
            } else if (isProperty) {
                currentNode = paragraphProperty.setDescriptionProperty(currentNode, descriptions);
            } else if (isList) {
                currentNode = listSection.setListDescription(currentNode, descriptions);
            } else {
                if (currentText?.trim()) {
                    currentParagraph = currentParagraph || "";
                    currentParagraph += currentText;
                }
                currentNode = currentNode.nextSibling;
            }
        }

        if (currentParagraph) this.processAncestryIntros(currentParagraph).forEach(description => descriptions.push({ type: DescriptionType.Paragraph, value: { description: description } }));

        return currentNode;
    }

    processAncestryIntros(paragraph: string): Array<string> {
        const elfIntro = "As an ancient people, elves have seen great change and have the perspective that can come only from watching the arc of history. After leaving Golarion in ancient times, they returned to a changed land, and they still struggle to reclaim their ancestral homes. Elves value kindness, intellect, and beauty, with many elves striving to improve their manners, appearance, and culture."
        const goblinIntro = "The convoluted histories other people cling to don't interest goblins. These small folk live in the moment, and they prefer tall tales over factual records. Goblin virtues are about being present, creative, and honest. They strive to lead fulfilled lives, rather than worrying about how their journeys will end.";
        const halflingIntro = "Claiming no place as their own, halflings control few settlements larger than villages. Instead, they frequently live among humans within larger cities, carving out small communities alongside taller folk. Optimistic, cheerful, and driven by powerful wanderlust, halflings make up for their short stature with an abundance of bravado.";
        const leshyIntro = "Leshies are immortal spirits of nature temporarily granted physical forms. As guardians and emissaries of the environment, leshies are “born” when a skilled druid or other master of primal magic conducts a ritual to create a suitable vessel, and then a spirit chooses that vessel to be their temporary home.";
        const orcIntro = "Orcs are forged in the fires of violence and conflict, often from the moment they are born. As they live lives that are frequently cut brutally short, orcs revel in testing their strength against worthy foes, often by challenging a higher-ranking member of their community for dominance.";
        const gnomeIntroFirstHalf = "Long ago, early gnome ancestors emigrated from the First World, realm of the fey. While it's unclear why the first gnomes wandered to Golarion, this lineage manifests in modern gnomes as bizarre reasoning, eccentricity, obsessive tendencies, and what some see as naivete.";
        const gnomeIntroSecondHalf = "Always hungry for new experiences, gnomes constantly wander both mentally and physically, attempting to stave off a terrible ailment that threatens all of their people.";

        if (paragraph.includes(elfIntro)) {
            return [elfIntro, paragraph.replace(elfIntro, "").trim()]
        } else if (paragraph.includes(goblinIntro)) {
            return [goblinIntro, paragraph.replace(goblinIntro, "").trim()]
        } else if (paragraph.includes(halflingIntro)) {
            return [halflingIntro, paragraph.replace(halflingIntro, "").trim()]
        } else if (paragraph.includes(leshyIntro)) {
            return [leshyIntro, paragraph.replace(leshyIntro, "").trim()]
        } else if (paragraph.includes(orcIntro)) {
            return [orcIntro, paragraph.replace(orcIntro, "").trim()]
        } else if (paragraph.includes(gnomeIntroFirstHalf)) {
            return [`${gnomeIntroFirstHalf}  ${gnomeIntroSecondHalf}`]
        } else if (paragraph.includes(gnomeIntroSecondHalf)) {
            return [paragraph.replace(gnomeIntroSecondHalf, "").trim()]
        } else {
            return [paragraph.trim()];
        }

    }

}

export const paragraphText = new ParagraphText();