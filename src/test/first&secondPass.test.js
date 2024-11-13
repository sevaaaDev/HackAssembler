import { expect } from "vitest";
import { firstPass, secondPass } from "../assembly";
describe("full app", () => {
  it("return empty string if line is comment (1&2)", () => {
    let result1 = firstPass("// comment");
    let result2 = secondPass("// comment");
    expect(result1).toBe("");
    expect(result2).toBe("");
  });
  it("return empty string if line is label (2)", () => {
    let result2 = secondPass("(LOOP)");
    expect(result2).toBe("");
  });
  it("return empty string if line is commented label (1&2)", () => {
    let result1 = firstPass("// (LOOP)");
    let result2 = secondPass("// (LOOP)");
    expect(result1).toBe("");
    expect(result2).toBe("");
  });
  it("notify when label is added to symbol table (1)", () => {
    let result = firstPass("(LOOP)");
    expect(result).toBe("Added to symbolTable");
  });
  it("return the correct binary and a newLine (2)", () => {
    let result = secondPass("@2");
    expect(result).toBe("0000000000000010\n");
  });
});
