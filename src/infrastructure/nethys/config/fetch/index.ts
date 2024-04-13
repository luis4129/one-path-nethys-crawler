import originalFetch from 'isomorphic-fetch';
import fetchBuilder from 'fetch-retry-ts';
import fetchHtmlDocument from './fetch-html';
import { fetchBatch } from './fetch-batch';


const options = {
    retries: 3,
    retryDelay: 1000,
    retryOn: [],
};

export const fetch: (url: string) => Promise<Response> = fetchBuilder(originalFetch, options);
export { fetchBatch, fetchHtmlDocument };