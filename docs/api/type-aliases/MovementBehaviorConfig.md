# MovementBehaviorConfig

```ts
type MovementBehaviorConfig =
  | {
      maxMoveSpeed: number;
      minMoveSpeed: number;
      mode?: "linear" | "acceleration";
    }
  | {
      listData: ValueList<number>;
      mode?: "linear" | "acceleration";
    };
```

Type defining the configuration for MovementBehavior.
