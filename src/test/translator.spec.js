import translator from "../translator";
describe("translator", () => {
  it("translate A instruction", () => {
    let parsedIns = { address: "13" };
    let translatedIns = translator.a(parsedIns);
    expect(translatedIns).toBe("0000000000001101");
  });
  it("translate C instruction", () => {
    let parsedIns = {
      comp: "D+1",
      dest: "D",
      jmp: "JEQ",
    };
    let translatedIns = translator.c(parsedIns);
    expect(translatedIns).toBe("1110011111010010");
  });
  it("translate C instruction w/o jmp", () => {
    let parsedIns = {
      comp: "D+1",
      dest: "D",
      jmp: null,
    };
    let translatedIns = translator.c(parsedIns);
    expect(translatedIns).toBe("1110011111010000");
  });
  it("translate C instruction w/o jmp & dest", () => {
    let parsedIns = {
      comp: "D+1",
      dest: null,
      jmp: null,
    };
    let translatedIns = translator.c(parsedIns);
    expect(translatedIns).toBe("1110011111000000");
  });
});
