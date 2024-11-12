import { expect } from "vitest";
import assembly from "../assembly";
import trim from "../trim";

let instructions = ["@sum", "M=0", "(LOOP)", "@LOOP"];
let output = ["0000000000010000", "1110101010001000", "", "0000000000000010"];

describe("Integrated test with Symbol", () => {
  it("translate to correct binary instruction", () => {
    let result = [];
    for (let i = 0; i < instructions.length; i++) {
      assembly(instructions[i], true);
    }
    for (let i = 0; i < instructions.length; i++) {
      let trimmed = trim.label(instructions[i]);
      if (trimmed === "") {
        result.push("");
        continue;
      }
      result.push(assembly(trimmed, false));
    }
    expect(result).toEqual(output);
  });
});
