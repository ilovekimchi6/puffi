import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

//We want to make sure the user does not send more than a certain number of words in a string field. So we implement a custom decorator to validate this!

export function MaxWords(max: number, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'maxWords',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [max],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [maxWords] = args.constraints;
          if (typeof value === 'string') {
            const wordCount = value.trim().split(/\s+/).length;
            return wordCount <= maxWords;
          }
          return false;
        },
        defaultMessage(args: ValidationArguments) {
          const [maxWords] = args.constraints;
          return `${args.property} should not have more than ${maxWords} words.`;
        },
      },
    });
  };
}
