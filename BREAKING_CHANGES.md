# Angular 8.x

NgEngine 8 requires Angular 8.x.x. Additionally, _depending on your module configuration_, you may have to treat imports from package.json differently. With Angular 8.x.x's default configuration, you must import as a default export (i.e. `import PKG from './package.json`).

# NgEngine 7.x

When upgrading from v6 and lower, you must change the module format from `es2015` to `commonjs` in all your tsconfig files.

## Before

```json
{
    "compilerOptions":{
        "module": "es2015"
    }
}
```

## After

```json
{
    "compilerOptions":{
        "module": "commonjs" // if it's already commonjs, you're ok
    }
}
```