import { TITLE } from "../../constants/classes";
import { BOLD, HEADING_1, HEADING_2, HEADING_3, HORIZONTAL_RULE, LINE_BREAK } from "../../constants/elements";
import { actionContainer } from "../action-container";
import { actionProperty } from "../action-property";
import { actionSubSection } from "../action-sub-section";
import { skippableProperty } from "../skippable-property";
import { skippableSection } from "../skippable-section";
import { skippableSubSection } from "../skippable-sub-section";
import { skippableText } from "../skippable-text";

export type StillContentFunction = (node: ChildNode) => boolean;

export const isStillMainContent = (node: ChildNode): boolean =>
    node.nodeName != HEADING_1 &&
    !actionContainer.isComponent(node) &&
    !actionSubSection.isComponent(node) &&
    !actionProperty.isComponent(node) &&
    !skippableText.isComponent(node) &&
    !skippableSection.isComponent(node)

export const isStillSectionContent = (node: ChildNode): boolean =>
    isStillMainContent(node) &&
    !(node.nodeName == HEADING_2 && (node as Element).className == TITLE)

export const isStillSubSectionContent = (node: ChildNode): boolean =>
    isStillSectionContent(node) &&
    !skippableSubSection.isComponent(node) &&
    !(node.nodeName == HEADING_3 && (node as Element).className == TITLE)

export const isStillParagraphContent = (node: ChildNode): boolean =>
    isStillSubSectionContent(node) &&
    !skippableProperty.isComponent(node) &&
    ![BOLD, HORIZONTAL_RULE, LINE_BREAK].includes(node.nodeName)