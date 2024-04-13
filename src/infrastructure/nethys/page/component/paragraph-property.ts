import { Description } from "../../../../application/domain/documents";
import { BOLD, LINE_BREAK } from "../constants/elements";
import { actionProperty } from "./action-property";
import { listSection } from "./list-section";
import { NethysComponent } from "./pattern";
import { isStillPropertyContent } from "./pattern/still-content";

const ParagraphPropertiesRegex = [
    /\bPopular Edicts$/,
    /\bPopular Anathema$/,
    /\bCritical Success$/,
    /\bSuccess$/,
    /\bFailure$/,
    /\bCritical Failure$/,
    /\bLong Casting Times$/,
    /\bLong Activation Times$/,
    /\bSpell Components$/,
    /\bActivation Components$/,
    /\bDisrupted and Lost Spells$/,
    /\bEffect$/,
    /\bWind-Up$/,
    /\bSpecial$/,
    /\bEnhancement$/,
    /\bLevel \((\+\d*|\d*(st|rd|th))\)/,
    /\bLevel$$/,
    /\bModifiers and AC$/,
    /\bHit Points$/,
    /\bSenses$/,
    /\bSpeed$/,
    /\bPet Abilities$/,
    /\bDraxie$/,
    /\bFirefly Sprite$/,
    /\bGrig$/,
    /\bMelixie$/,
    /\bNyktera$/,
    /\bPixie$/,
    /\bair$/,
    /\bearth$/,
    /\bfire$/,
    /\bmetal$/,
    /\bwater$/,
    /\bwood$/,
    /\bMelee$/,
    /\bRanged$/,
    /\bAwakening$/,
    /\bFloating$/,
    /\bItems$/,
    /\bAttacks$/,
    /\bStrength$/,
    /\bTies that Bind$/,
    /\bAmp$/,
    /\bBreached Defenses$/,
    /\bAttract$/,
    /\bRepel$/,
    /\bMask Freeze$/,
    /\bAquatic$/,
    /\bArctic$/,
    /\bDesert$/,
    /\bForest, Mountain, or Underground$/,
    /\bMountain$/,
    /\bPlains$/,
    /\bSky$/,
    /\bSwamp$/,
    /\bUnstable Function$/,
    /\bDisease or Poison$/,
    /\bPersistent Damage$/,
    /\bHeightened \((\+\d*|\d*(st|rd|th))\)/,
    /\bErudite$/,
    /\bLuminous$/,
    /\bMedic$/,
    /\bRadiant$/,
    /\bAlchemical$/,
    /\bClockwork$/,
    /\bMagical$/,
    /\bPulled$/,
    /\bRowed$/,
    /\bSteam$/,
    /\bWind$/,
    /\b1 \(Acid\):$/,
    /\b2 \(Cold\):$/,
    /\b3 \(Electricity\):$/,
    /\b4 \(Fire\):$/,
    /\b5 \(Force\):$/,
    /\b6 \(Sonic\):$/,
    /\bDracomancer$/,
    /\bKobold Breath$/,
    /\bStrongjaw Kobold$/,
    /\bVenomtail Kobold$/,
    /\bCuckoo Hag$/,
    /\bIron Hag$/,
    /\bSea Hag$/,
    /\bSweet Hag$/,
    /\bSpring$/,
    /\bSummer$/,
    /\bAutumn$/,
    /\bWinter$/,
    //has : right after
    /\bEgorian$/,
    /\bNantambu$/,
    /\bOrder's Berth$/,
    /\bLady Kedley$/,
    /\bSpinhead Vanluk$/,
    /\bBeacon (Shadow Absalom)$/,
    /\bCandlease/
]

export class ParagraphProperty extends NethysComponent {

    constructor() {
        super(
            [
                (node) => [BOLD].includes(node.nodeName),
                (node) => !!node.textContent?.trim(),
                (node) => {
                    const textContent = node.textContent?.trim() as string;
                    const isWithinList = ParagraphPropertiesRegex.some(regex => regex.test(textContent));
                    if (!isWithinList && !actionProperty.isComponent(node)) console.log("ParagraphProperty was not found within the list:", textContent);
                    return isWithinList
                }
            ],
            (node, object) => this.setDescriptionProperty(node, object.descriptions)
        )
    }

    setDescriptionProperty(node: ChildNode, parentDescription: Array<Description>): ChildNode | null {
        const property = {
            label: node.textContent?.trim() as string,
            descriptions: [] as Array<Description>
        }

        let currentNode = node.nextSibling;
        let currentParagraph: string | undefined;

        while (currentNode && isStillPropertyContent(currentNode)) {
            const currentText = currentNode.textContent;
            const isList = listSection.isComponent(currentNode);

            if (currentParagraph && (currentNode.nodeName == LINE_BREAK || isList)) {
                property.descriptions.push(capitalize(currentParagraph.trim()));
                currentParagraph = undefined;
            }

            if (isList) {
                currentNode = listSection.setListDescription(currentNode, property.descriptions);
            } else {
                if (currentText?.trim()) {
                    currentParagraph = currentParagraph || "";
                    currentParagraph += currentText;
                }
                currentNode = currentNode.nextSibling;
            }
        }

        if (currentParagraph) property.descriptions.push(capitalize(currentParagraph.trim()));

        parentDescription.push(property);
        return currentNode;
    }

}

function capitalize(paragraph: string) {
    const trimmedText = paragraph.trim();
    return trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1);
}

export const paragraphProperty = new ParagraphProperty();