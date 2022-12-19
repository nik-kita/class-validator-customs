import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { VassalSibling } from "../vassal-sibling.decorator";

const ALL_QUOTES = [
  'I\'l be back',
  'Avada Kedavra!',
  '...my precioussss...',
] as const;

class MovieQuoteDto {
  hero!: 'Terminator' | 'Volan De Mort' | 'Gollum';

  @VassalSibling({ context: MovieQuoteDto }, {
    masterSibling: 'hero',
    allVariants: ALL_QUOTES,
    masterVassalCombo: {
      Terminator: ['I\'l be back'],
      'Volan De Mort': ['Avada Kedavra!'],
      Gollum: ['...my precioussss...'],
    },
  })
  quote!: (typeof ALL_QUOTES)[number];
}

describe(`@${VassalSibling.name}`, () => {
  it.each([
    { hero: 'Gollum', quote: '...my precioussss...' },
    { hero: 'Terminator', quote: 'I\'l be back' },
    { hero: 'Volan De Mort', quote: 'Avada Kedavra!' },
  ] as MovieQuoteDto[])('Should successfully pass validation', (data) => {
    const instance = plainToInstance(MovieQuoteDto, data);
    const errors = validateSync(instance);

    expect(errors.length).toBe(0);
  });
});
