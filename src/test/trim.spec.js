import trim from "../trim";
describe("trim", () => {
  it("removes comment line", () => {
    let line = "// this is a comment";
    let trimmed = trim.comment(line);
    expect(trimmed).toBe("");
  });
  it("removes inline comment", () => {
    let line = "D=D+1   // this is a comment";
    let trimmed = trim.comment(line);
    expect(trimmed).toBe("D=D+1");
  });
  it("return the line trimmed if no comment", () => {
    let line = " @3";
    let trimmed = trim.whitespace(line);
    expect(trimmed).toBe("@3");
  });
  it("remove label line", () => {
    let line = "(LOOP) // comment";
    let trimmed = trim.label(line);
    expect(trimmed).toBe("");
  });
});
