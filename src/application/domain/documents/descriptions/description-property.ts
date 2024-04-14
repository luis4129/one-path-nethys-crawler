import { DescriptionList } from "./types/description-list";
import { DescriptionParagraph } from "./types/description-paragraph";
import { DescriptionTable } from "./types/description-table";
import { DescriptionType } from "./description-type";
import { DescriptionSection } from "./types/description-section";
import { DescriptionSubSection } from "./types/description-sub-section";

export interface DescriptionProperty {
    type: DescriptionType
    value: DescriptionProperty | DescriptionSection | DescriptionSubSection | DescriptionParagraph | DescriptionTable | DescriptionList;
}