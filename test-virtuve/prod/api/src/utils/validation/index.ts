/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import 'reflect-metadata';

type ValidRangeOptions = { property: string; rangeField: 'start' | 'end' };

@ValidatorConstraint()
export class IsValidDateRangeConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): Promise<boolean> | boolean {
    const [relatedField] = args.constraints as [ValidRangeOptions];
    const startOrEnd = (args.object as any)[relatedField.property];
    if (typeof startOrEnd === 'undefined') return true;

    const date = new Date(startOrEnd);
    const valueDate = new Date(value);

    // Check if other is a real date
    if (typeof startOrEnd === 'string' && !isNaN(date.getTime())) {
      return false;
    }

    return (
      (relatedField.rangeField === 'start' && date < valueDate) ||
      (relatedField.rangeField === 'end' && date > valueDate)
    );
  }

  defaultMessage(_: ValidationArguments): string {
    return 'invalid range';
  }
}

export function IsValidDateRange(range: ValidRangeOptions, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [range],
      validator: IsValidDateRangeConstraint,
    });
  };
}
