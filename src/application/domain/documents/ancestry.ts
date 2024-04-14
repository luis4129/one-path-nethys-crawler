import { Rarity } from "./rarity"
import { AbilityType } from "./ability-type"
import { Quirk } from "./quirk"
import { Heritage } from "./heritage"
import { Speed } from "./speed"
import { DescriptionProperty } from "./descriptions/description-property"

export interface Ancestry {
    _id?: string,
    name: string,
    rarity: Rarity,
    traits: Array<string>,
    sources: Array<string>,
    descriptions: Array<DescriptionProperty>,
    hitPoints: number,
    size: string,
    speed: Speed,
    abilities: {
        boosts: Array<AbilityType>,
        flaws?: Array<AbilityType>,
    },
    languages: {
        granted: Array<string>,
        selectable?: Array<string>
    },
    quirks?: Array<Quirk>,
    heritages?: Array<Heritage>
};