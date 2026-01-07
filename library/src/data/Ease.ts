/**
 * Type describing all possible easing functions.
 * @group Data/Easing/
 */
// prettier-ignore
export type Ease = "linear";

type EaseFunction = (v: number) => number;

// prettier-ignore
const easeToFunctionMap = {
    "linear": (v): number => v,
} satisfies Record<Ease, EaseFunction>;

Object.freeze(easeToFunctionMap);

/**
 * Gets the easing function based on parameter provided.
 * @param ease Ease to get.
 * @returns Easing function.
 */
export function getEaseFunction(ease: Ease): EaseFunction {
    return easeToFunctionMap[ease];
}
