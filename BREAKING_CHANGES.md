# NgEngine and Angular 7.x

When upgrading from v6 and lower, you must change the import from package.json to a "default import".

## Before

```ts
import * as PKG from './package.json'
```

## After

```ts
import PKG from './package.json'
```