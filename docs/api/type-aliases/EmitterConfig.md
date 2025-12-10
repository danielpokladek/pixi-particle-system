# EmitterConfig

```ts
type EmitterConfig = object;
```

Type defining the configuration for an Emitter.

## Properties

### addAtBack

```ts
addAtBack: boolean;
```

Whether new particles are added to the back of the particle list (behind other particles).

---

### alphaBehavior?

```ts
optional alphaBehavior: AlphaBehaviorConfig;
```

Configuration for the AlphaBehavior.

---

### colorBehavior?

```ts
optional colorBehavior: ColorBehaviorConfig;
```

Configuration for the ColorBehavior.

---

### emitterVersion

```ts
emitterVersion: number;
```

Emitter version this config was made for.

---

### maxParticleLifetime

```ts
maxParticleLifetime: number;
```

Maximum lifetime of particles emitted, in seconds.

---

### maxParticles

```ts
maxParticles: number;
```

Maximum number of particles allowed alive at once.

---

### minParticleLifetime

```ts
minParticleLifetime: number;
```

Minimum lifetime of particles emitted, in seconds.

---

### particlesPerWave

```ts
particlesPerWave: number;
```

Number of particles to spawn each wave.

---

### rotationBehavior?

```ts
optional rotationBehavior: RotationBehaviorConfig;
```

Configuration for the RotationBehavior.

---

### scaleBehavior?

```ts
optional scaleBehavior: ScaleBehaviorConfig;
```

Configuration for the ScaleBehavior.

---

### spawnBehavior?

```ts
optional spawnBehavior: SpawnBehaviorConfig;
```

Configuration for the SpawnBehavior.

---

### spawnChance

```ts
spawnChance: number;
```

Chance of spawning particles each wave, between 0 and 1.

---

### spawnInterval

```ts
spawnInterval: number;
```

Interval between spawn waves, in seconds.

---

### textureBehavior?

```ts
optional textureBehavior: TextureBehaviorConfig;
```

Configuration for the TextureBehavior.
