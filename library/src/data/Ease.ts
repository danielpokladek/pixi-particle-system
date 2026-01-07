// ---
// Easing functions are based on the amazing easing guide by Michael "Code Poet" Pohoreski (Michaelangel007).
// Source: https://github.com/Michaelangel007/easing
// ---

import { backIn, backInOut, backOut } from "./easing/eases/BackEase";
import { bounceIn, bounceInOut, bounceOut } from "./easing/eases/BounceEase";
import { circleIn, circleInOut, circleOut } from "./easing/eases/CircleEase";
import {
    elasticIn,
    elasticInOut,
    elasticOut,
} from "./easing/eases/ElasticEase";
import {
    power2In,
    power2InOut,
    power2Out,
    power3In,
    power3InOut,
    power3Out,
    power4In,
    power4InOut,
    power4Out,
    power5In,
    power5InOut,
    power5Out,
} from "./easing/eases/PowerEase";
import { sineIn, sineInOut, sineOut } from "./easing/eases/SineEase";

/**
 * Type describing an easing function.
 */
export type EaseFunction = (v: number) => number;

// prettier-ignore
const easeToFunctionMap = {
    "linear": (v): number => v,

    // Power Easing
    "power2.in": power2In,
    "power3.in": power3In,
    "power4.in": power4In,
    "power5.in": power5In,

    "power2.out": power2Out,
    "power3.out": power3Out,
    "power4.out": power4Out,
    "power5.out": power5Out,

    "power2.inout": power2InOut,
    "power3.inout": power3InOut,
    "power4.inout": power4InOut,
    "power5.inout": power5InOut,

    // Back Easing
    "back.in"   : backIn,
    "back.out"  : backOut,
    "back.inout": backInOut,

    // Bounce Easing
    "bounce.in"  : bounceIn,
    "bounce.out" : bounceOut,
    "bounce.inout": bounceInOut,

    // Circle Easing
    "circle.in"   : circleIn,
    "circle.out"  : circleOut,
    "circle.inout": circleInOut,

    // Elastic Easing
    "elastic.in"   : elasticIn,
    "elastic.out"  : elasticOut,
    "elastic.inout": elasticInOut,

    // Sine Eases
    "sine.in"   : sineIn,
    "sine.out"  : sineOut,
    "sine.inout": sineInOut
} satisfies Record<string, EaseFunction>;

Object.freeze(easeToFunctionMap);

/**
 * Type describing all possible easing functions.
 *
 * To see the logic these eases have been based on, and learn more about
 * how each of the eases work, visit Micheal Pohoreski's guide over at
 * their Github: https://github.com/Michaelangel007/easing.
 * @group Easing/
 */
export type Ease = keyof typeof easeToFunctionMap;

/**
 * Get an easing function from all available eases.
 * @param ease Ease to get.
 * @returns Easing function.
 */
export function getEaseFunction(ease: Ease): EaseFunction {
    return easeToFunctionMap[ease];
}
