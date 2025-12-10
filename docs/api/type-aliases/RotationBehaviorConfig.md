# RotationBehaviorConfig

```ts
type RotationBehaviorConfig = 
  | {
  mode: "static";
  value: number;
}
  | {
  listData: ValueList<number>;
  mode: "list";
}
  | {
  acceleration: number;
  mode: "acceleration";
  startRotation: number;
};
```

Type defining the configuration for RotationBehavior.
