const k = 1.70158;
const k2 = k * 1.525;

/**
 * Back ease-in function.
 *
 * Starts by moving slightly backward, then accelerates forward.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * backIn(0);   // 0
 * backIn(0.5); // ~-0.0877
 * backIn(1);   // 1
 * ```
 * @group Easing/Back/
 */
export function backIn(v: number): number {
    return v * v * (v * (k + 1) - k);
}

/**
 * Back ease-out function.
 *
 * Starts quickly and overshoots slightly past the end before settling.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * backOut(0);   // 0
 * backOut(0.5); // ~1.0877
 * backOut(1);   // 1
 * ```
 * @group Easing/Back/
 */
export function backOut(v: number): number {
    const m = v - 1;

    return 1 + m * m * (m * (k + 1) + k);
}

/**
 * Back ease-in-out function.
 *
 * Combines ease-in and ease-out with a slight overshoot at both ends.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * backInOut(0);   // 0
 * backInOut(0.5); // 0.5
 * backInOut(1);   // 1
 * ```
 * @group Easing/Back/
 */
export function backInOut(v: number): number {
    const m = v - 1;
    const t = v * 2;

    if (t < 1) return v * t * (t * (k2 + 1) - k2);

    return 1 + 2 * m * m * (2 * m * (k2 + 1) + k2);
}
