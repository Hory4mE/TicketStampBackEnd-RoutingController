import { ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";

export function NotAllow(validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: "NotAllow",
            target: object.constructor,
            propertyName,
            constraints: [propertyName],
            options: validationOptions,
            validator: {
                validate(_v: unknown, args: ValidationArguments) {
                    const currentTarget = args.object;
                    return !(propertyName in currentTarget);
                },
                defaultMessage() {
                    return `The ${propertyName} not allowed`;
                },
            },
        });
    };
}