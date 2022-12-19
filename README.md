
# About

Library for custom validators, builded with power of [class-validator](https://github.com/typestack/class-validator).
Focused both on special validation goals together with typescript support for all decorators.

# Decorators
* `@VassalSibling`
  > This decorator was created for situation, when `a` property of `SomeDto` is related of `b` property at the same level of the same dto.
  
  > That is why it has `a` property has `vassal` label and `b` - `master`.

  > So scenario is when `master` property has finite numbers of possible values and `vassal` property should change its constraints (own possible values) dynamically, related to `master`'s value.
  * Example:
  ```ts
  const ALL_QUOTES = [
    'I\'l be back',
    'Avada Kedavra!',
    'Crucio',
    '...my precioussss...',
    'putin HUYLO',
  ] as const;

  class MovieQuoteDto {
    hero: 'Terminator' | 'Volan De Mort' | 'Gollum';

    @VassalSibling({ each: true, context: MovieQuoteDto }, {
      masterSibling: 'hero',
      allVariants: ALL_QUOTES,
      masterVassalCombo: {
        Terminator: ['putin HUYLO', 'I\'l be back'],
        'Volan De Mort': ['Avada Kedavra!', 'putin HUYLO', 'Crucio'],
        Gollum: ['...my precioussss...'],
      },
    })
    quote: (typeof ALL_QUOTES)[number][]; 
  }

  ```
  * Why `context` option?
    > It is only for typescript. May be this decorator is looked little be complicated (hope in future it will be simplified...) but it is totally supported by typescript!

    > By the way, typescript! Each of string values in this example are hinted and restricted. For example `masterVassalCombo` is absolutely typed. So I hope it is declarative enough mapper for you constraint relation between: `all-possible-values-for-vassal <=> all-possible-values-for-master`

  * What is `masterSibling` doing?
    > This is the name of `master` property, on which your decorated (`vassal`) is depends on. (supported by ts in the way that it should be property of this dto)
  
  * What is `allVariants` doing?
    > This is real js constant, but honestly it uses here only for typescript binding in `masterVassalCombo` values.

    > During real validation only `masterVassalCombo`'s values are using.

  * `masterVassalCombo`:
    > This is the mapper of your constraint.

    > All keys are possible values for `masterSibling` property.

    > All values - possible values for `vassalSibling` when `masterSibling` is equal to related key value.

    > By the way! If `masterSibling` has incorrect value (not in keys of `masterVassalCombo`) the error happen, because it is impossible to validate `vassalSibling` value(s).

    > However! When standard class-validator option `{ each: true }` is used and `vassalSibling`'s value is empty array (`[]`) - even with incorrect value for `masterSibling` any errors are not happen, because validation don't start. That means, that you should validate your `masterSibling` property in any way.

  * Why so complicated type declaration: `(typeof ALL_QUOTES)[number][];`???
    > This is example of how it may be typed. May be you should know better solutions (please make issue). But idea is in that you define your values as js constant and then make type from it... it is very cool typescript feature! But after such manipulation your type will have `readonly` property. So in pseudocode, this line means:
    `take any element form unchangeable array and make array from them (even empty)`
# Tests
I try to support project with tests. May be in future it will be separate npm package... But for now feel free to use code from `src/decorators/_interested_you_decorator_/*` in your project (copy, change, modificate, upgrade, rename... Good Luck!)
```
npm run test
```

# TODO
* `@VassalSibling` decorator works both for single property mode or for arrays (standard `{ foreach: true }` option). But typescript currently supports only single variant.
