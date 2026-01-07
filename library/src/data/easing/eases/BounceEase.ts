const bounceCoefficient = 7.5625;
const bounceDivisor = 2.75;

const threshold1 = 1 / bounceDivisor;
const threshold2 = 2 / bounceDivisor;
const threshold3 = 2.5 / bounceDivisor;

const offset1 = 1.5 / bounceDivisor;
const offset2 = 2.25 / bounceDivisor;
const offset3 = 2.625 / bounceDivisor;

/**
 * Bounce ease-in function.
 *
 * Starts with small bounces and builds to larger bounces toward the end.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * bounceIn(0); // 0
 * bounceIn(1); // 1
 * ```
 * @group Easing/Bounce/
 */
export function bounceIn(v: number): number {
    return 1 - bounceOut(1 - v);
}

/**
 * Bounce ease-out function.
 *
 * Starts quickly, then bounces (overshooting and settling) toward the end.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * bounceOut(0); // 0
 * bounceOut(1); // 1
 * ```
 * @group Easing/Bounce/
 */
export function bounceOut(v: number): number {
    let t = 0;

    if (v < threshold1) {
        return bounceCoefficient * v * v;
    } else if (v < threshold2) {
        t = v - offset1;
        return bounceCoefficient * t * t + 0.75;
    } else if (v < threshold3) {
        t = v - offset2;
        return bounceCoefficient * t * t + 0.9375;
    } else {
        t = v - offset3;
        return bounceCoefficient * t * t + 0.984375;
    }
}

/**
 * Bounce ease-in-out function.
 *
 * Combines bounce ease-in and ease-out: bounces at the start and at the end.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * bounceInOut(0);   // 0
 * bounceInOut(0.5); // 0.5
 * bounceInOut(1);   // 1
 * ```
 * @group Easing/Bounce/
 */
export function bounceInOut(v: number): number {
    const t = v * 2;

    if (t < 1) return 0.5 - 0.5 * bounceOut(1 - t);
    else return 0.5 + 0.5 * bounceOut(t - 1);
}
