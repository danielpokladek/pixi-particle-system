# pixi-particle-system

## Classes

| Class                                           | Description                                                                                                                                                                                       |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AlphaBehavior](classes/AlphaBehavior.md)       | Behavior used to control the opacity of particles over their lifetime. Behavior can be configured using a static value, a list of values to interpolate over time, or a random value from a list. |
| [ColorBehavior](classes/ColorBehavior.md)       | Behavior which manages particle color over their lifetime.                                                                                                                                        |
| [Emitter](classes/Emitter.md)                   | Emitter class which handles particle spawning and updating.                                                                                                                                       |
| [EmitterBehavior](classes/EmitterBehavior.md)   | Abstract base class for emitter behaviors to extend from.                                                                                                                                         |
| [EmitterParticle](classes/EmitterParticle.md)   | Particle class used by the Emitter.                                                                                                                                                               |
| [MovementBehavior](classes/MovementBehavior.md) | Behavior used to control the movement of particles over their lifetime.                                                                                                                           |
| [PropertyList](classes/PropertyList.md)         | Singly linked list container for keeping track of interpolated properties for particles. Each Particle will have one of these for each interpolated property.                                     |
| [RotationBehavior](classes/RotationBehavior.md) | Behavior which handles particle rotation.                                                                                                                                                         |
| [ScaleBehavior](classes/ScaleBehavior.md)       | Behavior which scales particles over their lifetime.                                                                                                                                              |
| [SpawnBehavior](classes/SpawnBehavior.md)       | Behavior which spawns particles within a defined shape.                                                                                                                                           |
| [TextureBehavior](classes/TextureBehavior.md)   | Behavior which handles particle textures.                                                                                                                                                         |

## Interfaces

| Interface                                      | Description                                                                            |
| ---------------------------------------------- | -------------------------------------------------------------------------------------- |
| [InitBehavior](interfaces/InitBehavior.md)     | Interface defining behaviors which update particles on initialization.                 |
| [UpdateBehavior](interfaces/UpdateBehavior.md) | Interface defining behaviors which update particles on each update cycle.              |
| [ValueList](interfaces/ValueList.md)           | Configuration for an interpolated or stepped list of numeric or color particle values. |
| [ValueStep](interfaces/ValueStep.md)           | A single step of a ValueList.                                                          |

## Type Aliases

| Type Alias                                                       | Description                                           |
| ---------------------------------------------------------------- | ----------------------------------------------------- |
| [AlphaBehaviorConfig](type-aliases/AlphaBehaviorConfig.md)       | Type defining the configuration for AlphaBehavior.    |
| [ColorBehaviorConfig](type-aliases/ColorBehaviorConfig.md)       | Type defining the configuration for ColorBehavior.    |
| [EmitterConfig](type-aliases/EmitterConfig.md)                   | Type defining the configuration for an Emitter.       |
| [MovementBehaviorConfig](type-aliases/MovementBehaviorConfig.md) | Type defining the configuration for MovementBehavior. |
| [RotationBehaviorConfig](type-aliases/RotationBehaviorConfig.md) | Type defining the configuration for RotationBehavior. |
| [ScaleBehaviorConfig](type-aliases/ScaleBehaviorConfig.md)       | Type defining the configuration for ScaleBehavior.    |
| [SpawnBehaviorConfig](type-aliases/SpawnBehaviorConfig.md)       | Type defining the configuration for SpawnBehavior.    |
| [TextureBehaviorConfig](type-aliases/TextureBehaviorConfig.md)   | Type defining the configuration for TextureBehavior.  |
| [TextureConfig](type-aliases/TextureConfig.md)                   | Type defining the configuration for TextureBehavior.  |
