import { Context, KoaMiddlewareInterface, Middleware, MiddlewareExecutor } from "..";

const UNKNOWN_ERROR_CODE = 400;

@Middleware({ type: "before" })
export class ErrorResponderMiddleware implements KoaMiddlewareInterface {
    public async use(context: Context, next: MiddlewareExecutor) {
        try {
            await next();
        } catch (error) {
            const { name, status, httpCode, message, errors, ...payload } = error;
            context.status = status || httpCode || UNKNOWN_ERROR_CODE;
            context.body = {
                type: name,
                message: message || name || undefined,
                errors,
                ...payload,
            };

            throw error;
        }
    }
}