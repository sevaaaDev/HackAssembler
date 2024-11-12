import symbolTable from "./symbolTable.js";
class Parser {
  constructor() {}
  a(ins) {
    ins = ins.slice(1);
    if (!isNaN(parseInt(ins))) return { address: ins };
    if (symbolTable.table[ins] === undefined) {
      symbolTable.add(ins);
    }
    return { address: symbolTable.table[ins] };
  }
  c(ins) {
    let comp, dest, jmp;
    dest = this.dest(ins);
    ins = ins.replace(dest + "=", "");
    jmp = this.jmp(ins);
    ins = ins.replace(";" + jmp, "");
    comp = this.comp(ins);
    return {
      comp,
      dest,
      jmp,
    };
  }
  dest(ins) {
    let limit = ins.indexOf("=");
    return limit !== -1 ? ins.slice(0, limit) : null;
  }
  jmp(ins) {
    let start = ins.indexOf(";");
    return start !== -1 ? ins.slice(start + 1) : null;
  }
  comp(ins) {
    return ins;
  }
}

const parser = new Parser();
export default parser;
