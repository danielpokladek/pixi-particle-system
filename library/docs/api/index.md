# pixi-particle-system

## Classes

| Class                                           | Description                                                                                                                                                                                       |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AlphaBehavior](classes/AlphaBehavior.md)       | Behavior used to control the opacity of particles over their lifetime. Behavior can be configured using a static value, a list of values to interpolate over time, or a random value from a list. |
| [ColorBehavior](classes/ColorBehavior.md)       | Behavior which manages particle color over their lifetime.                                                                                                                                        |
| [ColorList](classes/ColorList.md)               | List used to interpolate through numeric values.                                                                                                                                                  |
| [Emitter](classes/Emitter.md)                   | Emitter class which handles particle spawning and updating.                                                                                                                                       |
| [EmitterBehavior](classes/EmitterBehavior.md)   | Abstract base class for emitter behaviors to extend from.                                                                                                                                         |
| [EmitterError](classes/EmitterError.md)         | An error specific to the particle system.                                                                                                                                                         |
| [EmitterParticle](classes/EmitterParticle.md)   | Particle class used by the Emitter.                                                                                                                                                               |
| [List](classes/List.md)                         | Abstract base class for lists that provide value interpolation over time.                                                                                                                         |
| [MovementBehavior](classes/MovementBehavior.md) | Behavior used to control the movement of particles over their lifetime.                                                                                                                           |
| [NumberList](classes/NumberList.md)             | List used to interpolate through numeric values.                                                                                                                                                  |
| [RotationBehavior](classes/RotationBehavior.md) | Behavior which handles particle rotation.                                                                                                                                                         |
| [ScaleBehavior](classes/ScaleBehavior.md)       | Behavior which scales particles over their lifetime.                                                                                                                                              |
| [SpawnBehavior](classes/SpawnBehavior.md)       | Behavior which spawns particles within a defined shape.                                                                                                                                           |
| [TextureBehavior](classes/TextureBehavior.md)   | Behavior which handles particle textures.                                                                                                                                                         |

## Interfaces

| Interface                                          | Description                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------------- |
| [IEmitterParticle](interfaces/IEmitterParticle.md) | Interface defining an emitter particle.                                   |
| [InitBehavior](interfaces/InitBehavior.md)         | Interface defining behaviors which update particles on initialization.    |
| [UpdateBehavior](interfaces/UpdateBehavior.md)     | Interface defining behaviors which update particles on each update cycle. |

## Type Aliases

| Type Alias                                                       | Description                                             |
| ---------------------------------------------------------------- | ------------------------------------------------------- |
| [AlphaBehaviorConfig](type-aliases/AlphaBehaviorConfig.md)       | Type defining the configuration for AlphaBehavior.      |
| [BaseParticleData](type-aliases/BaseParticleData.md)             | Type defining the data stored in each particle.         |
| [BasicTweenable](type-aliases/BasicTweenable.md)                 | Type describing a basic tweenable object.               |
| [BehaviorMode](type-aliases/BehaviorMode.md)                     | Type describing all possible behavior modes.            |
| [BehaviorOrder](type-aliases/BehaviorOrder.md)                   | Type defining the order in which behaviors are applied. |
| [ColorBehaviorConfig](type-aliases/ColorBehaviorConfig.md)       | Type defining the configuration for ColorBehavior.      |
| [EaseSegment](type-aliases/EaseSegment.md)                       | Type defining an ease segment.                          |
| [EmitterConfig](type-aliases/EmitterConfig.md)                   | Type defining the configuration for an Emitter.         |
| [ListData](type-aliases/ListData.md)                             | Type defining the data used to initialize a list.       |
| [ListNode](type-aliases/ListNode.md)                             | Type defining a node in a list.                         |
| [ListStep](type-aliases/ListStep.md)                             | Type describing a value step in a list.                 |
| [MovementBehaviorConfig](type-aliases/MovementBehaviorConfig.md) | Type defining the configuration for MovementBehavior.   |
| [MovementSpace](type-aliases/MovementSpace.md)                   | Type defining the possible movement spaces.             |
| [RGBAColor](type-aliases/RGBAColor.md)                           | Color type representing RGBA values.                    |
| [RotationBehaviorConfig](type-aliases/RotationBehaviorConfig.md) | Type defining the configuration for RotationBehavior.   |
| [ScaleBehaviorConfig](type-aliases/ScaleBehaviorConfig.md)       | Type defining the configuration for ScaleBehavior.      |
| [SimpleEase](type-aliases/SimpleEase.md)                         | Basic easing function type.                             |
| [SpawnBehaviorConfig](type-aliases/SpawnBehaviorConfig.md)       | Type defining the configuration for SpawnBehavior.      |
| [SpawnShape](type-aliases/SpawnShape.md)                         | Type defining the possible spawn shapes.                |
| [TextureBehaviorConfig](type-aliases/TextureBehaviorConfig.md)   | Type defining the configuration for TextureBehavior.    |
| [TextureConfig](type-aliases/TextureConfig.md)                   | Type defining the configuration for TextureBehavior.    |

## Functions

| Function                                                              | Description                                                                                                                                            |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [convertHexToRGB](functions/convertHexToRGB.md)                       | Converts a hex string from "#AARRGGBB", "#RRGGBB", "0xAARRGGBB", "0xRRGGBB", "AARRGGBB", or "RRGGBB" to an object of ints of 0-255, as {r, g, b, (a)}. |
| [convertRgbToUint](functions/convertRgbToUint.md)                     | Combines separate color components (0-255) into a single uint color.                                                                                   |
| [defaultInterpolateFunction](functions/defaultInterpolateFunction.md) | Default interpolate function that throws an error.                                                                                                     |
| [generateEase](functions/generateEase.md)                             | Generates a custom ease function, based on the GreenSock custom ease, as demonstrated by the related tool at http://www.greensock.com/customease/.     |
