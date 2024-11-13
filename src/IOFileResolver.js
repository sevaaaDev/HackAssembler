import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function fileResolver(input, output) {
  if (output === undefined) {
    output = path.basename(input, path.extname(input)) + ".hack";
  }
  input = path.resolve(__dirname, input);
  output = path.resolve(__dirname, output);
  return [input, output];
}
