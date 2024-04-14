import { ObjectId } from "mongodb";
import { Description } from "./descriptions/description";

export interface Quirk {
    name: string,
    descriptions: Array<Description>,
    actions?: Array<ObjectId>
}