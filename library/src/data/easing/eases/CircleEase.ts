/**
 * Circular ease-in function.
 *
 * Starts slowly and accelerates toward the end following a circular curve.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * circleIn(0);   // 0
 * circleIn(0.5); // ~0.134
 * circleIn(1);   // 1
 * ```
 * @group Easing/Circle/
 */
export function circleIn(v: number): number {
    return 1 - Math.sqrt(1 - v * v);
}

/**
 * Circular ease-out function.
 *
 * Starts quickly and decelerates toward the end following a circular curve.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * circleOut(0);   // 0
 * circleOut(0.5); // ~0.866
 * circleOut(1);   // 1
 * ```
 * @group Easing/Circle/
 */
export function circleOut(v: number): number {
    const m = v - 1;

    return Math.sqrt(1 - m * m);
}

/**
 * Circular ease-in-out function.
 *
 * Accelerates during the first half, then decelerates during the second half,
 * following a circular curve.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * circleInOut(0);   // 0
 * circleInOut(0.5); // 0.5
 * circleInOut(1);   // 1
 * ```
 * @group Easing/Circle/
 */
export function circleInOut(v: number): number {
    const m = v - 1;
    const t = v * 2;

    if (t < 1) return (1 - Math.sqrt(1 - t * t)) * 0.5;

    return (Math.sqrt(1 - 4 * m * m) + 1) * 0.5;
}
