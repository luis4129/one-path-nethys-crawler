import { ErrorResponse } from "../dto";

export default class IdNotFoundError extends ErrorResponse {
    constructor(uri: string, content: string) {
        super({
            message: "Unable to find id on uri content.",
            params: { uri: uri, content: content }
        });
    }
}