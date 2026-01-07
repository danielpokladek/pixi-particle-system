const elasticC = Math.PI / 6;

/**
 * Elastic ease-in function.
 *
 * Starts slowly, then accelerates with an elastic (oscillating) motion.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * elasticIn(0); // 0
 * elasticIn(1); // 1
 * ```
 * @group Easing/Elastic/
 */
export function elasticIn(v: number): number {
    const m = v - 1;

    return -Math.pow(2, 10 * m) * Math.sin((m * 40 - 3) * elasticC);
}

/**
 * Elastic ease-out function.
 *
 * Starts quickly, then decelerates with an elastic (oscillating) overshoot.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * elasticOut(0); // 0
 * elasticOut(1); // 1
 * ```
 * @group Easing/Elastic/
 */
export function elasticOut(v: number): number {
    return 1 + Math.pow(2, 10 * -v) * Math.sin((-v * 40 - 3) * elasticC);
}

/**
 * Elastic ease-in-out function.
 *
 * Combines elastic ease-in and ease-out: oscillates at the start and at the end.
 * Typically used to ease normalized progress values in the range `[0, 1]`.
 * @param v - Normalized progress value (commonly `0` to `1`).
 * @returns The eased value.
 * @example
 * ```ts
 * elasticInOut(0);   // 0
 * elasticInOut(0.5); // 0.5
 * elasticInOut(1);   // 1
 * ```
 * @group Easing/Elastic/
 */
export function elasticInOut(v: number): number {
    const s = 2 * v - 1;
    const k = ((80 * s - 9) * Math.PI) / 18;

    if (s < 0) return -0.5 * Math.pow(2, 10 * s) * Math.sin(k);
    else return 1 + -0.5 * Math.pow(2, -10 * s) * Math.sin(k);
}
