import { JSDOM } from "jsdom";
import { fetch } from '.';

export default async function fetchHtmlDocument(url: string): Promise<Document> {
    return fetch(url)
        .then(response => response.text())
        .then(htmlPage => new JSDOM(htmlPage).window.document)
}