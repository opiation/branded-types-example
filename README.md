# What are _branded_ types?

Branded types are a _slightly_ hacky way to uniquely identify a property of some
type or to ensure **at compile time** that a given value meets some additional
_type_ criterion.

# When are they most useful?

Branded types should probably not be used too much since their usage is not
really a use case intended by the language maintainers yet. That being said,
there are some use cases where they may be practical.

- String values meeting specific formats\
  e.g.: email address, UUID, non-empty (`#blank?`)
- Specific properties of a given type\
  e.g.: non-empty for collections, not-only-whitespace for strings, non-zero for
  numbers

# When are they not so useful?

Since branded types aren't really an intentional and supported feature, they
don't really play well with the boundaries of the type system.

If you find yourself kind of re-imlpementing a type hierarchy, make sure
everything you implement has a real-world purpose or you may be unnecessarily
going down an academic rabbit hole of _type correctness_, as is possible with
any sufficiently strict type system.

# Ok, so how do I make one if I really want to?

## 1. Define the _brand_.

First, define the _brand_ or property you want to ensure at compile time as an
`interface` with a single read-only property with a unique-ish name that is a
unique symbol...

```ts
interface UUID extends String {
  readonly UUID: unique symbol;
}
```

- Using an `interface` instead of a `type` can reveal when you have another
  thing defined with the same name and keeps the hover/completion docs succinct.
- Using a `readonly` `unique` symbol makes it so that no other type you could
  import will satisfy this type.

## 2. Implement a type guard to validate that brand

```ts
function isUUID(candidate: string): candidate is UUID {
  return true; // Use a UUID regular expression to do this correctly...
}
```

Since the brand has a `readonly` `unique` symbol as a property, this can
effectively make this type guard the _only_ way to validate that a given value
meets the type criteria. Yes, you can `as any` and do whatever you want but then
why use Typescript in the first place..?

## 3. Use your new brand wherever you want more strictness 🎉

```ts
function handleID(id: string | UUID) {
  if (isUUID(id)) {
    // Show something special for an actual UUID.
  } else {
    // Fallback to handling a generic string.
  }
}
```
