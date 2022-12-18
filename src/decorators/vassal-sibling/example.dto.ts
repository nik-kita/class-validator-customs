import { VassalSibling } from './vassal-sibling.decorator';

const HelloAllVariants = [
  '!', '!!!', '*', '***', ')', '))', '))))',
] as const;

// eslint-disable-next-line no-shadow
enum Hello {
  NIK = 'nik',
  UNIVERSE = 'universe',
  YOU = 'you'
}

export class ExampleDto {
  hello!: Hello;

  // eslint-disable-next-line no-use-before-define
  @VassalSibling({ context: ExampleDto }, {
    masterSibling: 'hello',
    allVariants: HelloAllVariants,
    masterVassalCombo: {
      nik: ['!'],
      universe: ['*', '))))'],
      you: [')', '))'],
    },
  })
  to!: string;
}
