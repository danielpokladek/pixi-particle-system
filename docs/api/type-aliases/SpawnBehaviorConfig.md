# SpawnBehaviorConfig

```ts
type SpawnBehaviorConfig = 
  | {
  shape: "point";
}
  | {
  shape: "line";
  width: number;
}
  | {
  height: number;
  shape: "rectangle";
  width: number;
}
  | {
  innerRadius?: number;
  outerRadius: number;
  shape: "circle";
};
```

Type defining the configuration for SpawnBehavior.
