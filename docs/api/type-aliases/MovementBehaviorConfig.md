# MovementBehaviorConfig

```ts
type MovementBehaviorConfig =
  | {
      maxMoveSpeed: number;
      minMoveSpeed: number;
      mode?: "linear" | "acceleration";
      space?: "local" | "global";
    }
  | {
      mode?: "linear" | "acceleration";
      space?: "local" | "global";
      xListData: ListData<number>;
      yListData?: ListData<number>;
    };
```

Type defining the configuration for MovementBehavior.
