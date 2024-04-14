import { Description } from "./descriptions/description"

export interface Trait {
    _id?: string,
    name: string,
    sources: Array<string>,
    descriptions: Array<Description>,
    effects?: Array<any>
};