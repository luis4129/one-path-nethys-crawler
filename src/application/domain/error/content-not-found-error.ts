import { ErrorResponse } from "../dto";

export default class ContentNotFoundError extends ErrorResponse {
    constructor(uri: string) {
        super({
            message: "Unable to find content to import within uri.",
            params: { uri: uri }
        });
    }
}