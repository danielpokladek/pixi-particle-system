# SpawnBehaviorConfig

```ts
type SpawnBehaviorConfig = object &
  | {
  shape: "point";
}
  | {
  length: number;
  shape: "line";
}
  | {
  height?: number;
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

## Type Declaration

### direction?

```ts
optional direction: PointData;
```
