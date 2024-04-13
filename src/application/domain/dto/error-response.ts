export class ErrorResponse extends Error {
    public message: string;
    public params: any;

    constructor({ message, params }: { message: string, params: any }) {
        super(message);
        this.message = message;
        this.params = params;
    }
}