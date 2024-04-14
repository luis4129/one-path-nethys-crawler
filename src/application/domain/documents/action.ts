import { ObjectId } from "mongodb"
import { ActionType } from "./action-type"
import { Description } from "./descriptions/description"
import { OriginType } from "./origin-type"

export interface Action {
    _id?: ObjectId,
    origin: OriginType,
    name: string,
    type?: ActionType,
    traits?: Array<string>,
    sources?: Array<string>,
    costs?: Array<string>,
    frequencies?: Array<string>,
    durations?: Array<string>,
    effects?: Array<string>,
    trigger?: Array<string>,
    requirements?: Array<string>,
    pfsNote?: string,
    descriptions: Array<Description>
}