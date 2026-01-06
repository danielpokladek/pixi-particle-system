# Behavior System

This particle system is designed to be flexible, extensible, lightweight, and user-friendly - for this reason it has been designed with behaviors, small and focused units of logic that initialize particles when they are created and/or update them every frame.

You can think of behaviors as modular building blocks: each behavior is responsible for one concern, and complex effects are created by combining multiple behaviors together.

::: tip
Some behaviors only run once when particle is created, such as [SpawnBehavior](/api/classes/SpawnBehavior.md), whilst others update particle properties continuously over time.
:::

## Built-In Behaviors

Currently the particle system is packaged with some built in behaviors, those are available out-of-the box and don't require any additional setup, apart from providing a valid config.

- [AlphaBehavior](/api/classes/AlphaBehavior.md)
- [ColorBehavior](/api/classes/ColorBehavior.md)
- [MovementBehavior](/api/classes/MovementBehavior.md)
- [RotationBehavior](/api/classes/RotationBehavior.md)
- [ScaleBehavior](/api/classes/ScaleBehavior.md)
- [SpawnBehavior](/api/classes/SpawnBehavior.md)
- [TextureBehavior](/api/classes/TextureBehavior.md)

An emitter typically uses several behaviors at once — for example, one to control movement, another for color, and another for scale.

Each one of those behaviors controls only one aspect of the particle, this means that behaviors never cross-contaminate properties and never get in each other's way (and also means the system is much easier to debug).

::: tip
Built-in behaviors cover most common effects. If you eventually need custom logic, you can implement your own behaviors — see [Custom Behaviors](../customization/custom-behavior.md) for more information.
:::