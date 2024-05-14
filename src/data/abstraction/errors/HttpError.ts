export abstract class CustomHttpError extends Error {
    name: string
    message: string
    status: number
    constructor(status: number, message: string) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.status = status;
    }
}