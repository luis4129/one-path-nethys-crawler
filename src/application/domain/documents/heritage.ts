import { Rarity } from "./rarity"
import { Description } from "./descriptions/description"
import { ObjectId } from "mongodb"

export interface Heritage {
    _id?: string,
    ancestry?: string,
    name: string,
    rarity: Rarity,
    traits?: Array<string>,
    sources: Array<string>,
    descriptions: Array<Description>,
    grantedActions?: Array<ObjectId>
};