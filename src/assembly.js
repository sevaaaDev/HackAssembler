import parser from "./parser.js";
import symbolTable from "./symbolTable.js";
import translator from "./translator.js";
import trim from "./trim.js";

let lineNum = 0;
export default function assembly(instruction, { firstPass }) {
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

function transpile(instruction) {
  let instructionType = "c";
  if (instruction.includes("@")) {
    instructionType = "a";
  }
  let parsed = parser[instructionType](instruction);
  let binary = translator[instructionType](parsed);
  return binary;
}

export function firstPass(line) {
  let instruction = trim.comment(line);
  if (instruction === "") return "";
  assembly(instruction, true);
  return "Added to symbolTable";
}

export function secondPass(line) {
  let instruction = trim.label(line);
  if (instruction === "") {
    return "";
  }
  return assembly(instruction, false) + "\n";
}
