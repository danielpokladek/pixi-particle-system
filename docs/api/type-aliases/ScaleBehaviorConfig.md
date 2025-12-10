# ScaleBehaviorConfig

```ts
type ScaleBehaviorConfig =
  | {
      mode?: "static";
      value: number;
    }
  | {
      listData: ValueList<number>;
      mode: "list" | "random";
    };
```

Type defining the configuration for ScaleBehavior.
