import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { wrapInQuotes } from '@app/utils';
import { CurrValidationArguments } from './vassal-sibling.decorator';

/* eslint-disable no-use-before-define */
@ValidatorConstraint()
export class VassalSiblingConstraint implements ValidatorConstraintInterface {
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
