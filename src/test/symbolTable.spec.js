import symbolTable from "../symbolTable";
describe("symbolTable", () => {
  it("add variable", () => {
    let address = symbolTable.add("sum");
    expect(address).toBe(16);
  });
  it("add label", () => {
    let address = symbolTable.add("STOP", 8);
    expect(address).toBe(8);
  });
});
