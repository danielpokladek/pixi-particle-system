# ColorBehaviorConfig

```ts
type ColorBehaviorConfig = 
  | {
  mode?: "static";
  value: ColorSource;
}
  | {
  listData: ValueList<string>;
  mode: "list" | "random";
};
```

Type defining the configuration for ColorBehavior.
