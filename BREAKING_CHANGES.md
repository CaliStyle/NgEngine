# Angular 7.x

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