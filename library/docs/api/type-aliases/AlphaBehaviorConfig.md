# AlphaBehaviorConfig

```ts
type AlphaBehaviorConfig =
    | {
          mode?: "static";
          value: number;
      }
    | {
          listData: ListData<number>;
          mode: "list" | "random";
      };
```

Type defining the configuration for AlphaBehavior.
