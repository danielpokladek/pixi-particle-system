import { expect, test } from "vitest";
import { EmitterError, NumberList } from "../../../src";

test("Default interpolate function throws EmitterError", () => {
    const list = new NumberList();

    expect(() => list.interpolate(0)).toThrow(EmitterError);
});
