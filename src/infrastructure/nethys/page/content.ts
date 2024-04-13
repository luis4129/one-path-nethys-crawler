import fetchHtmlDocument from "../config/fetch/fetch-html";
import { ContentNotFoundError } from "../../../application/domain/error";

const NETHYS_DOMAIN = "https://2e.aonprd.com";
const MAIN_CONTENT_ELEMENT_ID = "ctl00_RadDrawer1_Content_MainContent_DetailedOutput";

export default async function fetchPageContent(uri: string): Promise<HTMLElement> {
    return fetchHtmlDocument(`${NETHYS_DOMAIN}/${uri}`).then(document => {
        return document.getElementById(MAIN_CONTENT_ELEMENT_ID) || Promise.reject(new ContentNotFoundError(uri));
    });
}