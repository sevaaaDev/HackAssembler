import { describe, expect } from "vitest";
import { fileResolver } from "../IOFileResolver";

vi.mock("path", async (importOriginal) => {
  const methods = await importOriginal();
  return {
    default: { ...methods, dirname: vi.fn(() => "/test") },
  };
});
describe("I/O file resolver", () => {
  it("output file with the same name as the input, but with hack extension", () => {
    let [input, output] = fileResolver("Tetris.asm");
    expect(input).toBe("/test/Tetris.asm");
    expect(output).toBe("/test/Tetris.hack");
  });
  it("output file with custom name when given", () => {
    let [input, output] = fileResolver("Tetris.asm", "Custom.hack");
    expect(input).toBe("/test/Tetris.asm");
    expect(output).toBe("/test/Custom.hack");
  });
  it("output file with correct path when given relative path", () => {
    let [input, output] = fileResolver("../Tetris.asm", "../Custom.hack");
    expect(input).toBe("/Tetris.asm");
    expect(output).toBe("/Custom.hack");
  });
});
