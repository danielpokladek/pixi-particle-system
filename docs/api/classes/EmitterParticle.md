# EmitterParticle

Particle class used by the Emitter.

## Extends

- `Particle`

## Implements

- `IEmitterParticle`

## Constructors

### Constructor

```ts
new EmitterParticle(): EmitterParticle;
```

#### Returns

`EmitterParticle`

#### Overrides

```ts
Particle.constructor
```

## Properties

### anchorX

```ts
anchorX: number;
```

The x-coordinate of the anchor point (0-1).
Controls the origin point for rotation and scaling.

#### Example

```ts
particle.anchorX = 0.5; // Center horizontally
```

#### Default

```ts
0
```

#### Implementation of

```ts
IEmitterParticle.anchorX
```

#### Inherited from

```ts
Particle.anchorX
```

***

### anchorY

```ts
anchorY: number;
```

The y-coordinate of the anchor point (0-1).
Controls the origin point for rotation and scaling.

#### Example

```ts
particle.anchorY = 0.5; // Center vertically
```

#### Default

```ts
0
```

#### Implementation of

```ts
IEmitterParticle.anchorY
```

#### Inherited from

```ts
Particle.anchorY
```

***

### color

```ts
color: number;
```

The color of the particle as a 32-bit RGBA value.
Combines tint and alpha into a single value.

#### Example

```ts
// Usually set via tint and alpha properties
particle.tint = 0xff0000; // Red
particle.alpha = 0.5; // Half transparent
console.log(particle.color); // Combined RGBA value
```

#### Default

```ts
0xffffffff
```

#### Implementation of

```ts
IEmitterParticle.color
```

#### Inherited from

```ts
Particle.color
```

***

### data

```ts
data: BaseParticleData;
```

#### Implementation of

```ts
IEmitterParticle.data
```

***

### rotation

```ts
rotation: number;
```

The rotation of the particle in radians.
Positive values rotate clockwise.

#### Example

```ts
particle.rotation = Math.PI; // 180 degrees
particle.rotation += 0.1; // Rotate slowly clockwise
```

#### Default

```ts
0
```

#### Implementation of

```ts
IEmitterParticle.rotation
```

#### Inherited from

```ts
Particle.rotation
```

***

### scaleX

```ts
scaleX: number;
```

The horizontal scale factor of the particle.
Values greater than 1 increase size, less than 1 decrease size.

#### Example

```ts
particle.scaleX = 2; // Double width
particle.scaleX *= 0.9; // Shrink over time
```

#### Default

```ts
1
```

#### Implementation of

```ts
IEmitterParticle.scaleX
```

#### Inherited from

```ts
Particle.scaleX
```

***

### scaleY

```ts
scaleY: number;
```

The vertical scale factor of the particle.
Values greater than 1 increase size, less than 1 decrease size.

#### Example

```ts
particle.scaleY = 2; // Double height
particle.scaleY *= 0.9; // Shrink over time
```

#### Default

```ts
1
```

#### Implementation of

```ts
IEmitterParticle.scaleY
```

#### Inherited from

```ts
Particle.scaleY
```

***

### texture

```ts
texture: Texture;
```

The texture used to render this particle.
All particles in a container should share the same base texture.

#### Example

```ts
particle.texture = Texture.from('particle.png');
```

#### Implementation of

```ts
IEmitterParticle.texture
```

#### Inherited from

```ts
Particle.texture
```

***

### x

```ts
x: number;
```

The x-coordinate of the particle in world space.

#### Example

```ts
particle.x = 100; // Move right
particle.x += Math.sin(time) * 10; // Oscillate horizontally
```

#### Default

```ts
0
```

#### Implementation of

```ts
IEmitterParticle.x
```

#### Inherited from

```ts
Particle.x
```

***

### y

```ts
y: number;
```

The y-coordinate of the particle in world space.

#### Example

```ts
particle.y = 100; // Move down
particle.y += Math.cos(time) * 10; // Oscillate vertically
```

#### Default

```ts
0
```

#### Implementation of

```ts
IEmitterParticle.y
```

#### Inherited from

```ts
Particle.y
```

***

### defaultOptions

```ts
static defaultOptions: Partial<ParticleOptions>;
```

Default options used when creating new particles. These values are applied when specific
options aren't provided in the constructor.

#### Example

```ts
// Override defaults globally
Particle.defaultOptions = {
    ...Particle.defaultOptions,
    anchorX: 0.5,
    anchorY: 0.5,
    alpha: 0.8
};

// New particles use modified defaults
const centeredParticle = new Particle(texture);
console.log(centeredParticle.anchorX); // 0.5
console.log(centeredParticle.alpha); // 0.8
```

#### See

 - ParticleOptions For all available options
 - Particle For the particle implementation

#### Inherited from

```ts
Particle.defaultOptions
```

## Accessors

### alpha

#### Get Signature

```ts
get alpha(): number;
```

The transparency of the particle. Values range from 0 (fully transparent)
to 1 (fully opaque). Values outside this range are clamped.

##### Example

```ts
// Create a semi-transparent particle
const particle = new Particle({
    texture: Texture.from('particle.png'),
    alpha: 0.5
});

// Fade out
particle.alpha *= 0.9;

// Fade in
particle.alpha = Math.min(particle.alpha + 0.1, 1);

// Values are clamped to valid range
particle.alpha = 1.5; // Becomes 1.0
particle.alpha = -0.5; // Becomes 0.0

// Animate transparency
app.ticker.add((delta) => {
    const time = performance.now() / 1000;
    particle.alpha = 0.5 + Math.sin(time) * 0.5; // Pulse between 0-1
});
```

##### Default

```ts
1
```

##### See

 - Particle#tint For controlling particle color
 - [Particle#color](#color) For the combined color and alpha value

##### Returns

`number`

#### Set Signature

```ts
set alpha(value): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

##### Returns

`void`

#### Implementation of

```ts
IEmitterParticle.alpha
```

#### Inherited from

```ts
Particle.alpha
```

***

### tint

#### Get Signature

```ts
get tint(): number;
```

The tint color of the particle. Can be set using hex numbers or CSS color strings.
The tint is multiplied with the texture color to create the final particle color.

##### Example

```ts
// Create a red particle
const particle = new Particle({
    texture: Texture.from('particle.png'),
    tint: 0xff0000
});

// Use CSS color strings
particle.tint = '#00ff00';  // Green
particle.tint = 'blue';     // Blue

// Animate tint color
app.ticker.add(() => {
    const time = performance.now() / 1000;

    // Cycle through hues
    const hue = (time * 50) % 360;
    particle.tint = `hsl(${hue}, 100%, 50%)`;
});

// Reset to white (no tint)
particle.tint = 0xffffff;
```

##### Default

```ts
0xffffff
```

##### See

 - Particle#alpha For controlling transparency
 - [Particle#color](#color) For the combined color and alpha value
 - Color For supported color formats

##### Returns

`number`

#### Set Signature

```ts
set tint(value): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `ColorSource` |

##### Returns

`void`

#### Implementation of

```ts
IEmitterParticle.tint
```

#### Inherited from

```ts
Particle.tint
```

## Methods

### reset()

```ts
reset(): void;
```

#### Returns

`void`

#### Inherit Doc

#### Implementation of

```ts
IEmitterParticle.reset
```
