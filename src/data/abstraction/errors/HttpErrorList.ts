import { CustomHttpError } from "./HttpError";

export class InternalServerError extends CustomHttpError {
    static status: number = 500;
    constructor(message: string = "An Unexpected error occurred. Please contact Administrator.") {
        super(InternalServerError.status, message);
    }
}

export class BadRequestError extends CustomHttpError {
    static status: number = 400;
    constructor(message: string = "Your input is Invalid") {
        super(BadRequestError.status, message);
    }
}

