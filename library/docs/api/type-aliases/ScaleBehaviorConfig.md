# ScaleBehaviorConfig

```ts
type ScaleBehaviorConfig =
    | {
          mode?: "static";
          value: PointData;
      }
    | {
          mode: "list" | "random";
          xListData: ListData<number>;
          yListData?: ListData<number>;
      };
```

Type defining the configuration for ScaleBehavior.
