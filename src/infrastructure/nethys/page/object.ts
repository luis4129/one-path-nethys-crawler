import { AbilityType, DescriptionProperty, Quirk, Rarity } from "../../../application/domain/documents";
import fetchPageContent from "./content";
import { abilityBoosts, abilityFlaws, emptyText, hitPoints, image, languages, legacySubSection, legacyVersionRedirect, lineBreak, listSection, mainTitle, paragraphSection, paragraphSubSection, search, size, source, space, speed, table, trait, mechanicsTitle, paragraphText } from "./component";
import { ancestryQuirk } from "./component/ancestry-quirk";
import { versatileHeritageSection } from "./component/versatile-heritage-section";
import { pfsNote } from "./component/pfs-note";
import { trigger } from "./component/triggers";
import { frequency } from "./component/frequency";
import { requirements } from "./component/requirements";
import { cost } from "./component/costs";
import { ActionType } from "../../../application/domain/documents/action-type";
import { horizontalRule } from "./component/horizontal-rule";
import { paragraphProperty } from "./component/paragraph-property";
import { Speed } from "../../../application/domain/documents/speed";
import { actionContainer } from "./component/action-container";
import { actionSubSection } from "./component/action-sub-section";
import { ObjectId } from "mongodb";
import { skippableSection } from "./component/skippable-section";
import { prerequisites } from "./component/prerequisites";
import { access } from "./component/access";
import { archetype } from "./component/archetype";
import { spoilerSection } from "./component/spoiler-section";
import { skippableSubSection } from "./component/skippable-sub-section";
import { StillContentFunction } from "./component/pattern/still-content";
import { otherInformation } from "./component/other-information";
import { skippableText } from "./component/skippable-text";
import { actionProperty } from "./component/action-property";
import { effect } from "./component/effect";
import { duration } from "./component/duration";
import { skippableProperty } from "./component/skippable-property";

export class NethysObject {
    // Generic
    public presetId?: ObjectId;
    public name?: string;
    public rarity?: Rarity;
    public traits?: Array<string>;
    public sources?: Array<string>;
    public pfsNote?: string;
    public descriptions: Array<DescriptionProperty>;
    public grantedActions?: Array<NethysObject>;
    // Feats
    public level?: number;
    public access?: Array<string>
    public prerequisites?: Array<string>
    public archetypes?: Array<string>;
    // Action
    public actionType?: ActionType;
    public costs?: Array<string>;
    public effects?: Array<string>;
    public frequencies?: Array<string>;
    public triggers?: Array<string>;
    public requirements?: Array<string>;
    public durations?: Array<string>;
    // Ancestry and Versatile Heritage  
    public quirks?: Array<Quirk>;
    // Ancestry
    public hitPoints?: number;
    public size?: string;
    public speed?: Speed;
    public abilityBoosts?: Array<AbilityType>;
    public abilityFlaws?: Array<AbilityType>;
    public grantedLanguages?: Array<string>;
    public selectableLanguages?: Array<string>;

    constructor() {
        this.descriptions = [];
    }
}

export function setObjectProperties(node: ChildNode | null, object: NethysObject, url?: string, isStillContent?: StillContentFunction): ChildNode | null {
    let currentNode = node;

    while (currentNode && (!isStillContent || isStillContent(currentNode))) {
        if (emptyText.isComponent(currentNode) ||
            horizontalRule.isComponent(currentNode) ||
            image.isComponent(currentNode) ||
            legacySubSection.isComponent(currentNode) ||
            legacyVersionRedirect.isComponent(currentNode) ||
            lineBreak.isComponent(currentNode) ||
            mechanicsTitle.isComponent(currentNode) ||
            search.isComponent(currentNode) ||
            space.isComponent(currentNode) ||
            spoilerSection.isComponent(currentNode) ||
            otherInformation.isComponent(currentNode) ||
            skippableText.isComponent(currentNode)
        ) {
            currentNode = currentNode.nextSibling;
        } else if (mainTitle.isComponent(currentNode)) {
            currentNode = mainTitle.setComponentProperties(currentNode, object);
        } else if (source.isComponent(currentNode)) {
            currentNode = source.setComponentProperties(currentNode, object);
        } else if (trigger.isComponent(currentNode)) {
            currentNode = trigger.setComponentProperties(currentNode, object);
        } else if (frequency.isComponent(currentNode)) {
            currentNode = frequency.setComponentProperties(currentNode, object);
        } else if (requirements.isComponent(currentNode)) {
            currentNode = requirements.setComponentProperties(currentNode, object);
        } else if (access.isComponent(currentNode)) {
            currentNode = access.setComponentProperties(currentNode, object);
        } else if (prerequisites.isComponent(currentNode)) {
            currentNode = prerequisites.setComponentProperties(currentNode, object);
        } else if (archetype.isComponent(currentNode)) {
            currentNode = archetype.setComponentProperties(currentNode, object);
        } else if (cost.isComponent(currentNode)) {
            currentNode = cost.setComponentProperties(currentNode, object);
        } else if (duration.isComponent(currentNode)) {
            currentNode = duration.setComponentProperties(currentNode, object);
        } else if (effect.isComponent(currentNode)) {
            currentNode = effect.setComponentProperties(currentNode, object);
        } else if (pfsNote.isComponent(currentNode)) {
            currentNode = pfsNote.setComponentProperties(currentNode, object);
        } else if (trait.isComponent(currentNode)) {
            currentNode = trait.setComponentProperties(currentNode, object);
        } else if (hitPoints.isComponent(currentNode)) {
            currentNode = hitPoints.setComponentProperties(currentNode, object);
        } else if (size.isComponent(currentNode)) {
            currentNode = size.setComponentProperties(currentNode, object);
        } else if (speed.isComponent(currentNode)) {
            currentNode = speed.setComponentProperties(currentNode, object);
        } else if (abilityBoosts.isComponent(currentNode)) {
            currentNode = abilityBoosts.setComponentProperties(currentNode, object);
        } else if (abilityFlaws.isComponent(currentNode)) {
            currentNode = abilityFlaws.setComponentProperties(currentNode, object);
        } else if (languages.isComponent(currentNode)) {
            currentNode = languages.setComponentProperties(currentNode, object);
        } else if (ancestryQuirk.isComponent(currentNode)) {
            currentNode = ancestryQuirk.setComponentProperties(currentNode, object);
        } else if (versatileHeritageSection.isComponent(currentNode)) {
            currentNode = versatileHeritageSection.setComponentProperties(currentNode, object);
        } else if (skippableSection.isComponent(currentNode)) {
            currentNode = skippableSection.skipComponent(currentNode);
        } else if (skippableSubSection.isComponent(currentNode)) {
            currentNode = skippableSubSection.skipComponent(currentNode);
        } else if (skippableProperty.isComponent(currentNode)) {
            currentNode = skippableProperty.skipComponent(currentNode);
        } else if (actionContainer.isComponent(currentNode)) {
            currentNode = actionContainer.setComponentProperties(currentNode, object);
        } else if (actionSubSection.isComponent(currentNode)) {
            currentNode = actionSubSection.setComponentProperties(currentNode, object);
        } else if (actionProperty.isComponent(currentNode)) {
            currentNode = actionProperty.setComponentProperties(currentNode, object);
        } else if (table.isComponent(currentNode)) {
            currentNode = table.setComponentProperties(currentNode, object);
        } else if (listSection.isComponent(currentNode)) {
            currentNode = listSection.setComponentProperties(currentNode, object);
        } else if (paragraphSection.isComponent(currentNode)) {
            currentNode = paragraphSection.setComponentProperties(currentNode, object);
        } else if (paragraphSubSection.isComponent(currentNode)) {
            currentNode = paragraphSubSection.setComponentProperties(currentNode, object);
        } else if (paragraphProperty.isComponent(currentNode)) {
            currentNode = paragraphProperty.setComponentProperties(currentNode, object);
        } else if (paragraphText.isComponent(currentNode)) {
            currentNode = paragraphText.setComponentProperties(currentNode, object);
        } else {
            console.log("Unmapped property", {
                url: url,
                nodeType: currentNode.nodeType,
                nodeName: currentNode.nodeName,
                nodeValue: currentNode.nodeValue,
                textContent: currentNode.textContent,
                outerHtml: (currentNode as HTMLElement).outerHTML.toString(),
                previousSibling: currentNode.previousSibling?.nodeName,
                nextSibling: currentNode.nextSibling?.nodeName
            });
            currentNode = currentNode.nextSibling;
        }
    }

    return currentNode;
}

export default async function fetchNethysObject(url: string): Promise<NethysObject> {
    return fetchPageContent(url).then(content => {
        const object = new NethysObject();
        setObjectProperties(content.firstChild, object);
        return object;
    });
}
