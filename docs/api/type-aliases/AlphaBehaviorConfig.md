# AlphaBehaviorConfig

```ts
type AlphaBehaviorConfig = 
  | {
  mode?: "static";
  value: number;
}
  | {
  listData: ValueList<number>;
  mode: "list" | "random";
};
```

Type defining the configuration for AlphaBehavior.
