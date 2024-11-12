import parser from "../parser";
import symbolTable from "../symbolTable";
describe("parser no symbol", () => {
  it("parse A instruction", () => {
    let { address } = parser.a("@245");
    expect(address).toBe("245");
  });
  it("parse C instruction", () => {
    let { comp, dest, jmp } = parser.c("D=D+1;JEQ");
    expect(comp).toBe("D+1");
    expect(dest).toBe("D");
    expect(jmp).toBe("JEQ");
  });
  it("parse C instruction w/o jmp", () => {
    let { comp, dest, jmp } = parser.c("D=D+1");
    expect(comp).toBe("D+1");
    expect(dest).toBe("D");
    expect(jmp).toBe(null);
  });
  it("parse C instruction w/o jmp & dest", () => {
    let { comp, dest, jmp } = parser.c("D+1");
    expect(comp).toBe("D+1");
    expect(dest).toBe(null);
    expect(jmp).toBe(null);
  });
});

describe("parser with symbol", () => {
  it("parse A instruction with built in symbol", () => {
    let { address } = parser.a("@R1");
    expect(address).toBe("1");
  });
  it("parse A instruction with custom symbol", () => {
    let { address } = parser.a("@sum");
    expect(address).toBe("16");
  });
});
