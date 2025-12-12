# ColorBehaviorConfig

```ts
type ColorBehaviorConfig =
    | {
          mode?: "static";
          value: ColorSource;
      }
    | {
          listData: ListData<string>;
          mode: "list" | "random";
      };
```

Type defining the configuration for ColorBehavior.
