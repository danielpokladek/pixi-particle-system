# MovementBehaviorConfig

```ts
type MovementBehaviorConfig =
    | {
          maxMoveSpeed: PointData;
          minMoveSpeed: PointData;
          mode?: "linear" | "acceleration";
          space?: MovementSpace;
      }
    | {
          mode?: "linear" | "acceleration";
          space?: MovementSpace;
          xListData: ListData<number>;
          yListData?: ListData<number>;
      };
```

Type defining the configuration for MovementBehavior.
