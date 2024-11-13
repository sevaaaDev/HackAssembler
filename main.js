import { argv } from "process";
import fs from "node:fs";
import readline from "readline";
import events from "events";
import { firstPass, secondPass } from "./src/assembly.js";
import { fileResolver } from "./src/IOFileResolver.js";

(async function main() {
  if (argv[2] === undefined) {
    showHelp();
    return;
  }
  assembler(argv[2], argv[3]);
})();

function showHelp() {
  console.log(`Hack Assembler
USAGE
  hasm <source> <output>
`);
}

async function assembler(file, out) {
  let [input, output] = fileResolver(file, out);
  const outStream = fs.createWriteStream(output);
  const firstRL = readline.createInterface({
    input: fs.createReadStream(input),
    crlfDelay: Infinity,
  });

  firstRL.on("line", (line) => {
    firstPass(line);
  });
  await events.once(firstRL, "close");
  const secondRL = readline.createInterface({
    input: fs.createReadStream(input),
    crlfDelay: Infinity,
  });

  secondRL.on("line", (line) => {
    outStream.write(secondPass(line));
  });
}
