/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValueByKeyType } from '../types/value-by-key.type';

enum Column {
  FOO = 'foo',
  BAR = 'bar',
  BAZ = 'baz',
  QUX = 'qux',
}

type Action = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
][number];

// const ColumnActionCombo: Record<Column, Action[]> = { // DON'T DELETE
const ColumnActionCombo = { // comment this and uncomment upper line
  bar: ['five'],
  baz: ['four', 'one'],
  foo: ['five', 'six'],
  qux: ['three', 'two'],
  // }; // DON'T DELETE
} as const; // comment this and uncomment upper

const test: ValueByKeyType<typeof ColumnActionCombo, 'baz'> = ['four', 'one'];
