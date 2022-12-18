import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ExampleDto } from './decorators/vassal-sibling/example.dto';

async function main() {
  const dto = plainToInstance(ExampleDto, {
    hello: 'you',
    to: '***',
  });

  const errors = validateSync(dto);

  console.log(errors);
}

main();
