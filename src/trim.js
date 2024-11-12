class Trim {
  comment(line) {
    let commentIndex = line.indexOf("//");
    if (commentIndex === -1) {
      return line.trim();
    }
    return line.slice(0, commentIndex).trim();
  }
  label(line) {
    let lineWithoutComment = this.comment(line);
    let isLabel = lineWithoutComment.includes("(");
    if (isLabel) return "";
    return lineWithoutComment;
  }
  whitespace(line) {
    return line.trim();
  }
}
const trim = new Trim();
export default trim;
