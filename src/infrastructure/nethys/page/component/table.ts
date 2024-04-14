import { DescriptionProperty } from "../../../../application/domain/documents";
import { DescriptionType } from "../../../../application/domain/documents/descriptions/description-type";
import { DescriptionTable } from "../../../../application/domain/documents/descriptions/types/description-table";
import { TABLE, TABLE_BODY, TABLE_DATA, TABLE_ROW } from "../constants/elements";
import { NethysComponent } from "./pattern";

class Table extends NethysComponent {

    constructor() {
        super(
            [
                (node) => node.nodeName == TABLE
            ],
            (node, object) => this.setTableDescription(node, object.descriptions)
        )
    }

    setTableDescription(node: ChildNode, parentDescription: Array<DescriptionProperty>): ChildNode | null {
        const table = { headers: [], data: [] } as DescriptionTable;
        const tableElement = node as Element;
        const bodyElement = tableElement.querySelector(TABLE_BODY);

        const fetchData = (rowElement: Element): Array<string> => Array.from(rowElement.querySelectorAll(`${TABLE_DATA}`))
            .map(header => header.textContent?.trim() || "")
            .filter(header => header !== "");

        if (bodyElement) {
            Array.from(bodyElement.querySelectorAll(TABLE_ROW)).map((rowElement, index) => {
                if (!index) {
                    table.headers = fetchData(rowElement);
                } else {
                    table.data.push(fetchData(rowElement));
                }
            });
        } else {
            console.log("Table has no body");
        }

        parentDescription.push({ type: DescriptionType.Table, value: table });
        return node.nextSibling;
    }

}

export const table = new Table();