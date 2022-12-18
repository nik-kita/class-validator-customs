/* eslint-disable no-regex-spaces */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  ValidationArguments, ValidatorConstraintInterface, ValidationOptions, registerDecorator,
  ValidatorConstraint,
} from 'class-validator';

type Options<T> = Omit<ValidationOptions, 'context'> & {
  context: T,
};

export const VassalSibling = <
  T extends new () => any,
  K extends keyof InstanceType<T>,
  U extends readonly string[],
>(options: Options<T>, constraint: {
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

type CurrValidationArguments = ValidationArguments & {
  constraints: [Omit<Parameters<typeof VassalSibling>[1], 'masterSibling'> & {
    masterSibling: string,
  }],
};

@ValidatorConstraint()
class VassalSiblingConstraint implements ValidatorConstraintInterface {
  private message = '';

  validate(value: any, {
    constraints: [constraint], object, property,
  }: CurrValidationArguments): boolean | Promise<boolean> {
    const { masterSibling, masterVassalCombo } = constraint;
    const masterValue = (object as any)[masterSibling];
    const masterKeys = Object.keys(masterVassalCombo);
    const isGoodMaster = masterKeys.includes(masterValue);

    if (!isGoodMaster) {
      this.message = `\
Unexpected value for property '${masterSibling}'! \
Actual = '${masterValue}'. \
Expected = one from [${masterKeys.map(wrapInQuotes).join()}].
That's why validation of '${property}' property \
is impossible...\
`;

      return false;
    }

    const result = masterVassalCombo[masterValue]
      .includes(value);

    if (result) {
      return result;
    }

    this.message = `\
When property '${masterSibling}'='${masterValue}', \
'${property}' should be one from \
[${masterVassalCombo[masterValue].map(wrapInQuotes).join()}]\
`;

    return false;
  }

  defaultMessage(): string {
    return this.message;
  }
}

function wrapInQuotes(target: string) {
  return `'${target}'`;
}
