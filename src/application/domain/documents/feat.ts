import { ObjectId } from "mongodb"
import { Description } from "./description"
import { Rarity } from "./rarity"

export interface Feat {
    _id?: string,
    name: string,
    level: number,
    rarity: Rarity,
    traits: Array<string>,
    archetypes?: Array<string>,
    sources: Array<string>,
    leads?: Array<string>,
    access?: Array<string>,
    prerequisites?: Array<string>,
    pfsNote?: string,
    descriptions: Array<Description>,
    grantedActions?: Array<ObjectId>
}