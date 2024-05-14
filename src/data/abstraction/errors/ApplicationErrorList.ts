import { ApplicationError } from "./ApplicationError";

export class NotFoundError extends ApplicationError {
    constructor(message: string = "Not Found Error") {
        super(message);
    }
}

export class ForbiddenError extends ApplicationError{
    constructor(message: string = "Forbidden Error"){
        super(message);
    }
}