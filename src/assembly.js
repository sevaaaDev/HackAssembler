import parser from "./parser.js";
import symbolTable from "./symbolTable.js";
import translator from "./translator.js";

let lineNum = 0;
export default function assembly(instruction, firstPass) {
  if (!firstPass) {
    return transpile(instruction);
  }
  if (instruction.includes("(")) {
    let start = instruction.indexOf("(");
    let end = instruction.indexOf(")");
    symbolTable.add(instruction.slice(start + 1, end), lineNum);
    return;
  }
  lineNum++;
}

// addLabel(line) {
// if (line includes '(') {
// table.add(name, lineNum)
// }else {
// lineNum++
// }
// }

function transpile(instruction) {
  let instructionType = "c";
  if (instruction.includes("@")) {
    instructionType = "a";
  }
  let parsed = parser[instructionType](instruction);
  let binary = translator[instructionType](parsed);
  return binary;
}
