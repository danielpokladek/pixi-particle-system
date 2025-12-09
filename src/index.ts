export { Emitter } from "./Emitter";
export type { EmitterConfig } from "./EmitterConfig";

export { EmitterParticle } from "./particle/EmitterParticle";

export { EmitterBehavior } from "./behavior/EmitterBehavior";
export type { InitBehavior, UpdateBehavior } from "./behavior/EmitterBehavior";

export { AlphaBehavior } from "./behavior/built-in/AlphaBehavior";
export { ColorBehavior } from "./behavior/built-in/ColorBehavior";
export { RotationBehavior } from "./behavior/built-in/RotationBehavior";
export { ScaleBehavior } from "./behavior/built-in/ScaleBehavior";
export { SpawnBehavior } from "./behavior/built-in/SpawnBehavior";

export { PropertyList } from "./data/PropertyList";
export type { ValueList, ValueStep } from "./data/PropertyList";
