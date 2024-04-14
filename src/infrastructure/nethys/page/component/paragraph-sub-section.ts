import { DescriptionProperty } from "../../../../application/domain/documents";
import { DescriptionType } from "../../../../application/domain/documents/descriptions/description-type";
import { DescriptionList } from "../../../../application/domain/documents/descriptions/types/description-list";
import { DescriptionParagraph } from "../../../../application/domain/documents/descriptions/types/description-paragraph";
import { DescriptionTable } from "../../../../application/domain/documents/descriptions/types/description-table";
import { TITLE } from "../constants/classes";
import { HEADING_3, LINE_BREAK } from "../constants/elements";
import { actionContainer } from "./action-container";
import { actionSubSection } from "./action-sub-section";
import { listSection } from "./list-section";
import { paragraphFraming } from "./paragraph-framing";
import { paragraphProperty } from "./paragraph-property";
import { NethysComponent } from "./pattern";
import { isStillSubSectionContent } from "./pattern/still-content";
import { skippableProperty } from "./skippable-property";
import { skippableSubSection } from "./skippable-sub-section";

const ParagraphSubSections = [
    "Sample Names", "Strike Statistics", "Activation Components", "Duskwalker Origins", "Taking Tea with Death", "Ulfen Beastkin", "Werecreatures as PCs",
    "Ardande Relations", "Ardande Settlements", "Family Relations", "Geniekin Cuisine", "Geniekin Trendsetters", "Ifrit Settlements", "Oread Settlements",
    "Suli Settlements", "Sylph Settlements", "Undine Settlements", "Talos Settlements", "Ganzi Features", "Ganzi Settlements", "Aphorite Settlements",
    "Relations with Axis", "Dhampir Settlements", "Strigoi", "Final Usurpation", "A Place Undersea", "Alghollthus", "Azarketi Enclaves", "Azarketi Types",
    "Fighting Spirit", "Legacy of Azlant", "Other Sea Creatures", "Nagaji Enclaves", "Nagaji Travelers", "Natural Explorers", "Vanara Enclaves", "Rokoas",
    "Catfolk Luck", "Murraseth", "Other Catfolk", "Fox Families", "Kitsune Settlements", "The Lady of Foxes", "Android Settlements", "Vishkanya Enclaves",
    "Casandalee and Androids", "Thoughts on Androids", "Vishkanya Travelers", "Strix Settlements", "Strix Storytelling", "Riding PCs", "Sprites in Society",
    "Tiny PCs", "Kashrishi and Religion", "Kashrishi Guests", "Thoughts on Kashrishi", "Ghoran Enclaves", "Ghoran Travelers", "Fleshwarp Legends", "Droon",
    "Fleshforges", "Fleshwarp Motives", "Fleshwarp Settlements", "The Mana Wastes", "Automaton Origins", "Enhancements", "Versatile Heritages", "Iruxi",
    "Tengu Bottles", "Tengu Settlements", "The Storm God's People", "Ratfolk Settlements", "Second Ticker", "Ysoki of the Red Planet", "Iruxi Ancestors",
    "Kobold Origins", "Other Kobolds", "Traps!", "Cantorian Spring", "International Relationships", "Looming Concerns", "Fetchling Settlements", "Kayal",
    "The Widow", "Poppet Motives", "Poppet Settlements", "Poppets in Society", "Changing Attitudes", "Alchemical and Magical Items", "Crafting Example",
    "Consumables and Ammunition", "Formulas", "Examining Forgeries", "Sample Earn Income Tasks", "Extra Preparation", "Sample Sense Direction Tasks",
    "Sample Subsist Tasks", "Sample Decipher Writing Tasks", "Sample Gather Information Tasks", "Magical Traditions and Skills", "Income Examples",
    "Sample Squeeze Tasks", "Sample Track Tasks", "Paragons of Promise"

]

export class ParagraphSubSection extends NethysComponent {

    constructor() {
        super(
            [
                (node) => [HEADING_3].includes(node.nodeName),
                (node) => (node as Element).className == TITLE,
                (node) => !!node.textContent?.trim(),
                (node) => {
                    const textContent = node.textContent?.trim() as string;
                    const isWithinList = ParagraphSubSections.includes(textContent);
                    if (!isWithinList && !actionSubSection.isComponent(node) && !actionContainer.isComponent(node) && !skippableSubSection.isComponent(node)) console.log("ParagraphSubSection was not found within the list:", textContent);
                    return isWithinList
                }
            ],
            (node, object) => this.setDescriptionSubSection(node, object.descriptions)
        )
    }

    setDescriptionSubSection(node: ChildNode, parentDescription: Array<DescriptionProperty>): ChildNode | null {
        const label = node.textContent?.trim() as string;
        const descriptions = [] as Array<DescriptionProperty>;
        let currentNode = node.nextSibling;
        let currentParagraph: string | undefined;

        while (currentNode && isStillSubSectionContent(currentNode)) {
            const currentText = currentNode.textContent;
            const isFraming = paragraphFraming.isComponent(currentNode);
            const isProperty = paragraphProperty.isComponent(currentNode);
            const isSkippableProperty = skippableProperty.isComponent(currentNode);
            const isList = listSection.isComponent(currentNode);
            const isLineBreak = currentNode.nodeName == LINE_BREAK;

            if (currentParagraph && (isFraming || isSkippableProperty || isProperty || isList || isLineBreak)) {
                descriptions.push({ type: DescriptionType.Paragraph, value: { description: currentParagraph.trim() } });
                currentParagraph = undefined;
            }

            if (isFraming) {
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

        if (currentParagraph) descriptions.push({ type: DescriptionType.Paragraph, value: { description: currentParagraph.trim() } });

        parentDescription.push({
            type: DescriptionType.SubSection,
            value: { label: label, descriptions: descriptions }
        });

        return currentNode;
    }

}

export const paragraphSubSection = new ParagraphSubSection();