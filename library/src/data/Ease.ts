// ---
// Easing functions are based on the amazing easing guide by Michael "Code Poet" Pohoreski (Michaelangel007).
// Source: https://github.com/Michaelangel007/easing
// ---

export type EaseFunction = (v: number) => number;

const k = 1.70158;
const k2 = k * 1.525;

const bounceReciprocal = 1 / 2.75;
const bounceK1 = bounceReciprocal;
const bounceK2 = 2 * bounceReciprocal;
const bounceK3 = 1.5 * bounceReciprocal;
const bounceK4 = 2.5 * bounceReciprocal;
const bounceK5 = 2.25 * bounceReciprocal;
const bounceK6 = 2.625 * bounceReciprocal;
const bounceK0 = 7.5625;

const elasticC = Math.PI / 6;

// prettier-ignore
const easeToFunctionMap = {
    "linear": (v): number => v,

    "power2.in": (v): number => v * v,
    "power3.in": (v): number => v * v * v,
    "power4.in": (v): number => v * v * v * v,
    "power5.in": (v): number => v * v * v * v * v,

    "power2.out": (v): number => { const m = v - 1; return 1 - m * m;             },
    "power3.out": (v): number => { const m = v - 1; return 1 + m * m * m;         },
    "power4.out": (v): number => { const m = v - 1; return 1 - m * m * m * m;     },
    "power5.out": (v): number => { const m = v - 1; return 1 + m * m * m * m * m; },

    "power2.inout": (v): number => { const m = v - 1; const t = v * 2; if (t < 1) return v * t;             else return 1 - m * m     * 2   },
    "power3.inout": (v): number => { const m = v - 1; const t = v * 2; if (t < 1) return v * t * t;         else return 1 - m * m * m * 4;  },
    "power4.inout": (v): number => { const m = v - 1; const t = v * 2; if (t < 1) return v * t * t * t;     else return 1 - m * m * m * 8;  },
    "power5.inout": (v): number => { const m = v - 1; const t = v * 2; if (t < 1) return v * t * t * t * t; else return 1 - m * m * m * 16; },

    // Back Easing
    "back.in"   : (v): number => {
        return v * v * (v * (k + 1) - k);
    },
    "back.out"  : (v): number => { 
        const m = v - 1;
        
        return 1 + m * m * (m * (k + 1) + k);
    },
    "back.inout": (v): number => { 
        const m = v - 1;
        const t = v * 2;
    
        if (t < 1) 
            return v * t * (t * (k2 + 1) - k2);

        return 1 + 2 * m * m * (2 * m * (k2 + 1) + k2);
    },

    // Bounce Easing
    "bounce.in"  : (v): number => {
        return 1 - easeToFunctionMap["bounce.out"](1 - v);
    },
    "bounce.out" : (v): number => {
        let t = 0;

        if      (v < bounceK1) {             return bounceK0 * v * v;            }
        else if (v < bounceK2) { t = v - bounceK3; return bounceK0 * t * t + 0.75;     }
        else if (v < bounceK4) { t = v - bounceK5; return bounceK0 * t * t + 0.9375;   }
        else             { t = v - bounceK6; return bounceK0 * t * t + 0.984375; }
    },
    "bounce.inout": (v): number => {
        const t = v * 2;

        if (t < 1) return 0.5 - 0.5 * easeToFunctionMap["bounce.out"](1 - t);
        else       return 0.5 + 0.5 * easeToFunctionMap["bounce.out"](t - 1);
    },

    // Circle Easing
    "circle.in"   : (v): number => {
        return 1 - Math.sqrt(1 - v * v);
    },
    "circle.out"  : (v): number => {
        const m = v -1;

        return Math.sqrt(1 - m * m);
    },
    "circle.inout": (v): number => {
        const m = v - 1;
        const t = v * 2;

        if (t < 1)
            return (1 - Math.sqrt( 1 - t * t)) * 0.5;
        
        return (Math.sqrt(1 - 4 * m * m) + 1) * 0.5;
    },

    // Elastic Easing
    "elastic.in"   : (v): number => {
        const m = v - 1;

        return -Math.pow(2, 10 * m) * Math.sin((m * 40 - 3) * elasticC);
    },
    "elastic.out"  : (v): number => {
        return 1 + (Math.pow(2, 10 * -v) * Math.sin((-v * 40 - 3) * elasticC));
    },
    "elastic.inout": (v): number => {
        const s = 2 * v - 1;
        const k = (80 * s - 9) * Math.PI / 18;

        if (s < 0) return     -0.5 * Math.pow(2,  10 * s) * Math.sin(k);
        else       return 1 + -0.5 * Math.pow(2, -10 * s) * Math.sin(k)
    },

    // Sine Eases
    "sine.in"   : (v): number => {
        return 1 - Math.cos(v * Math.PI * 0.5);
    },
    "sine.out"  : (v): number => {
        return Math.sin(v * Math.PI * 0.5);
    },
    "sine.inout": (v): number => {
        return Math.cos(v * Math.PI);
    }
} satisfies Record<string, EaseFunction>;

/**
 * Type describing all possible easing functions.
 */
export type Ease = keyof typeof easeToFunctionMap;

Object.freeze(easeToFunctionMap);

/**
 * Gets the easing function based on parameter provided.
 * @param ease Ease to get.
 * @returns Easing function.
 */
export function getEaseFunction(ease: Ease): EaseFunction {
    return easeToFunctionMap[ease];
}
