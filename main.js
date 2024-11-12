import { argv } from "process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "node:fs";
import readline from "readline";
import events from "events";
import assembly from "./src/assembly.js";
import trim from "./src/trim.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main(file, out) {
  const outStream = fs.createWriteStream(path.resolve(__dirname, out), {
    flags: "a",
  });
  const firstPass = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, file)),
    crlfDelay: Infinity,
  });

  firstPass.on("line", (line) => {
    let instruction = trim.comment(line);
    if (instruction === "") return;
    assembly(instruction, true);
  });
  await events.once(firstPass, "close");
  const secondPass = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, file)),
    crlfDelay: Infinity,
  });

  secondPass.on("line", (line) => {
    let instruction = trim.label(line);
    if (instruction === "") {
      return;
    }
    outStream.write(assembly(instruction, false) + "\n");
  });
}

main(argv[2], argv[3]);
