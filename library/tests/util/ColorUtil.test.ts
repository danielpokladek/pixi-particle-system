import { describe, expect, it } from "vitest";
import {
    convertHexToRGB,
    convertHexToUint,
    convertRgbToUint,
    convertUintToHex,
} from "../../src";

describe("convert RGB to Uint values", () => {
    it("should be 0xff0000 for red", () => {
        expect(convertRgbToUint(255, 0, 0)).toBe(0xff0000);
    });

    it("should be 0x00ff00 for green", () => {
        expect(convertRgbToUint(0, 255, 0)).toBe(0x00ff00);
    });

    it("should be 0x0000ff for blue", () => {
        expect(convertRgbToUint(0, 0, 255)).toBe(0x0000ff);
    });

    it("should be 0xffffff for white", () => {
        expect(convertRgbToUint(255, 255, 255)).toBe(0xffffff);
    });

    it("should be 0x000000 for black", () => {
        expect(convertRgbToUint(0, 0, 0)).toBe(0x000000);
    });

    it("should be 0x123456 for rgb(18, 52, 86)", () => {
        expect(convertRgbToUint(18, 52, 86)).toBe(0x123456);
    });

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const uintColor = (r << 16) | (g << 8) | b;

    it(`should be ${uintColor.toString(16)} for rgb(${r}, ${g}, ${b})`, () => {
        expect(convertRgbToUint(r, g, b)).toBe(uintColor);
    });
});

describe("convert Hex to RGB values", () => {
    it("should convert #ff0000 to (255, 0, 0)", () => {
        expect(convertHexToRGB("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    });

    it("should convert 0x00ff00 to (0, 255, 0)", () => {
        expect(convertHexToRGB("0x00ff00")).toEqual({ r: 0, g: 255, b: 0 });
    });

    it("should convert 0x0000ff to (0, 0, 255)", () => {
        expect(convertHexToRGB("0000ff")).toEqual({ r: 0, g: 0, b: 255 });
    });

    it("should convert 0xffffff to (255, 255, 255)", () => {
        expect(convertHexToRGB("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
    });

    it("should convert 0x000000 to (0, 0, 0)", () => {
        expect(convertHexToRGB("#000000")).toEqual({ r: 0, g: 0, b: 0 });
    });

    it("should convert 0x123456 to (18, 52, 86)", () => {
        expect(convertHexToRGB("#123456")).toEqual({ r: 18, g: 52, b: 86 });
    });

    const color = Math.floor(Math.random() * 0xffffff);
    const hexColor = `#${color.toString(16).padStart(6, "0")}`;
    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = color & 0xff;

    it(`should convert ${hexColor} to (${r}, ${g}, ${b})`, () => {
        expect(convertHexToRGB(hexColor)).toEqual({ r, g, b });
    });
});

describe("convert Uint to Hex values", () => {
    it("should convert 0xff0000 to #ff0000", () => {
        expect(convertUintToHex(0xff0000)).toBe("#ff0000");
    });

    it("should convert 0x00ff00 to #00ff00", () => {
        expect(convertUintToHex(0x00ff00)).toBe("#00ff00");
    });

    it("should convert 0x0000ff to #0000ff", () => {
        expect(convertUintToHex(0x0000ff)).toBe("#0000ff");
    });

    it("should convert 0xffffff to #ffffff", () => {
        expect(convertUintToHex(0xffffff)).toBe("#ffffff");
    });

    it("should convert 0x000000 to #000000", () => {
        expect(convertUintToHex(0x000000)).toBe("#000000");
    });

    it("should convert 0x123456 to #123456", () => {
        expect(convertUintToHex(0x123456)).toBe("#123456");
    });

    const color = Math.floor(Math.random() * 0xffffff);
    const hexColor = `#${color.toString(16).padStart(6, "0")}`;

    it(`should convert ${color.toString(16)} to ${hexColor}`, () => {
        expect(convertUintToHex(color)).toBe(hexColor);
    });
});

describe("convert Hex to Uint values", () => {
    it("should convert #ff0000 to 0xff0000", () => {
        expect(convertHexToUint("#ff0000")).toBe(0xff0000);
    });

    it("should convert 0x00ff00 to 0x00ff00", () => {
        expect(convertHexToUint("0x00ff00")).toBe(0x00ff00);
    });

    it("should convert 0000ff to 0x0000ff", () => {
        expect(convertHexToUint("0000ff")).toBe(0x0000ff);
    });

    it("should convert #ffffff to 0xffffff", () => {
        expect(convertHexToUint("#ffffff")).toBe(0xffffff);
    });

    it("should convert #000000 to 0x000000", () => {
        expect(convertHexToUint("#000000")).toBe(0x000000);
    });

    it("should convert #123456 to 0x123456", () => {
        expect(convertHexToUint("#123456")).toBe(0x123456);
    });

    const color = Math.floor(Math.random() * 0xffffff);
    const hexColor = `#${color.toString(16).padStart(6, "0")}`;

    it(`should convert ${hexColor} to ${color.toString(16)}`, () => {
        expect(convertHexToUint(hexColor)).toBe(color);
    });
});
