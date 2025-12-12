# ScaleBehaviorConfig

```ts
type ScaleBehaviorConfig =
    | {
          mode?: "static";
          value: number;
      }
    | {
          listData: ListData<number>;
          mode: "list" | "random";
      };
```

Type defining the configuration for ScaleBehavior.
