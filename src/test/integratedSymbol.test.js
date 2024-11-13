import { expect } from "vitest";
import assembly from "../assembly";
import trim from "../trim";

describe("Integrated test with Symbol", () => {
  it("translate label correctly", () => {
    assembly("D=D+1", { firstPass: true });
    assembly("(LOOP)", { firstPass: true });
    let result = assembly("@LOOP", { firstPass: false });
    expect(result).toBe("0000000000000001");
  });
});
