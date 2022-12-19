import { plainToInstance } from "class-transformer";
import { validateSync } from 'class-validator';
import { VassalSibling } from "../vassal-sibling.decorator";

const siblingsVariantsForTest1 = ['hi', 'hello', 'yo', 'vechir dobrii', 'ku'] as const;

class Test1 {
  country!: 'USA' | 'Ukraine';

  @VassalSibling({
    context: Test1,
    each: true,
  }, {
    allVariants: siblingsVariantsForTest1,
    masterSibling: 'country',
    masterVassalCombo: {
      Ukraine: ['vechir dobrii', 'hi', 'ku'],
      USA: ['hello', 'hi', 'yo', 'ku'],
    },
  })
  greeting!: (typeof siblingsVariantsForTest1)[number][]
}

describe(`@${VassalSibling.name}`, () => {
  it.each([
    { country: 'USA', greeting: ['hello'] },
    { country: 'USA', greeting: ['hello', 'hi'] },
    { country: 'USA', greeting: ['hello', 'yo', 'hi'] },
    { country: 'USA', greeting: ['hi', 'ku'] },
    { country: 'USA', greeting: [] },
    { country: 'Ukraine', greeting: [] },
    { country: 'Ukraine', greeting: ['vechir dobrii'] },
    { country: 'Ukraine', greeting: ['ku'] },
  ] as Test1[])('Should success pass validation', (data) => {
    const errors = validateSync(plainToInstance(Test1, data));

    expect(errors.length).toBe(0);
  });

  it.each([
    { country: '-USA', greeting: ['hello'] },
    { country: '-USA', greeting: ['hello', 'hi'] },
    { country: '-USA', greeting: ['hello', 'yo', 'hi'] },
    { country: '-USA', greeting: ['hi', 'ku'] },
    { country: '-Ukraine', greeting: ['vechir dobrii'] },
    { country: '-Ukraine', greeting: ['ku'] },
  ])('Should fail validation because of masterSibling value', (data) => {
    const errors = validateSync(plainToInstance(Test1, data));

    expect(errors.length).toBe(1);
  });

  it.each([
    { country: '-USA', greeting: [] },
    { country: '-Ukraine', greeting: [] },
    { country: '-Ukraine', greeting: [] },
  ])('Should success validation even with incorrect masterSibling value because vassalSibling is empty array', (data) => {
    const errors = validateSync(plainToInstance(Test1, data));

    expect(errors.length).toBe(0);
  });
});
