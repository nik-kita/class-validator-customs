import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { VassalSiblingConstraint } from './vassal-sibling.constraint';

type CurrValidationOptions<T> = Omit<ValidationOptions, 'context'> & {
  context: T,
};

export const VassalSibling = <
  T extends new () => any,
  K extends keyof InstanceType<T>,
  U extends readonly string[],
>(options: CurrValidationOptions<T>, constraint: {
  masterSibling: K,
  allVariants: U,
  masterVassalCombo: Record<InstanceType<T>[K], (keyof Record<U[number], unknown>)[]>,
}) => (obj: object, propName: string) => registerDecorator({
    target: obj.constructor,
    propertyName: propName,
    options,
    constraints: [constraint],
    validator: VassalSiblingConstraint,
  });

export type CurrValidationArguments = ValidationArguments & {
  constraints: [Omit<Parameters<typeof VassalSibling>[1], 'masterSibling'> & {
    masterSibling: string,
  }],
};
