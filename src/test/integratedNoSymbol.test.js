import assembly from "../assembly";
const instructionC = "D=M";
const instructionA = "@2";
describe("Integrated test no Symbol", () => {
  it("translate to correct binary instruction C", () => {
    let result = assembly(instructionC, { firstPass: false });
    expect(result).toBe("1111110000010000");
  });
  it("translate to correct binary instruction A", () => {
    let result = assembly(instructionA, { firstPass: false });
    expect(result).toBe("0000000000000010");
  });
});
