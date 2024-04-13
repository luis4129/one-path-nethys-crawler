/**
  * @property size - Number of simultaneous asynchronous requests
  * @property interval - Interval between batch requests in milliseconds (timer starts when previous batch ends)
  */

type Fetch = (params: any) => Promise<any>;
import { performance } from 'perf_hooks';

const SIZE = 100;
const INTERVAL = 2000;

export async function fetchBatch(fetch: Fetch, params: Array<any>): Promise<Array<any>> {
    const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const startTime = performance.now();
    let lastLap = startTime;
    let startingIndex = 0;
    let responses = [] as Array<any>;

    while (startingIndex < params.length) {
        const endingIndex = startingIndex + SIZE;
        const currentBatch = params.slice(startingIndex, endingIndex);
        const currentResponses = await Promise.all(currentBatch.map(async url => await fetch(url)));

        const newLap = performance.now()
        lastLap = newLap;

        responses = responses.concat(currentResponses);
        console.log(responses.length);
        startingIndex = endingIndex;

        await timeout(INTERVAL);
    }

    console.log(performance.now() - startTime);

    return responses;
}