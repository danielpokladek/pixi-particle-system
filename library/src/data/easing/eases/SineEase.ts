/**
 * Sine ease-in function.
 *
 * Starts slowly and accelerates toward the end following a sine curve.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * sineIn(0);   // 0
 * sineIn(0.5); // ~0.2929
 * sineIn(1);   // 1
 * ```
 * @group Easing/Sine/
 */
export function sineIn(v: number): number {
    return 1 - Math.cos(v * Math.PI * 0.5);
}

/**
 * Sine ease-out function.
 *
 * Starts quickly and decelerates toward the end following a sine curve.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * sineOut(0);   // 0
 * sineOut(0.5); // ~0.7071
 * sineOut(1);   // 1
 * ```
 * @group Easing/Sine/
 */
export function sineOut(v: number): number {
    return Math.sin(v * Math.PI * 0.5);
}

/**
 * Sine ease-in-out function.
 *
 * Computes a cosine curve over the input.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The value `cos(v·π)`.
 * @example
 * ```ts
 * sineInOut(0);   // 1
 * sineInOut(0.5); // 0
 * sineInOut(1);   // -1
 * ```
 * @group Easing/Sine/
 */
export function sineInOut(v: number): number {
    return Math.cos(v * Math.PI);
}
