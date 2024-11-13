import { argv } from "process";
import fs from "node:fs";
import readline from "readline";
import events from "events";
import { firstPass, secondPass } from "./src/assembly";
import { fileResolver } from "./src/IOFileResolver";

async function main(file, out) {
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

main(argv[2], argv[3]);
