import test from "ava";
const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const log = console.log;
//Paths
const input = path.join(__dirname, "../tests/sandbox/input");
const output = path.join(__dirname, "../tests/sandbox/output");

test.before(t => {
  fs.removeSync(output);
});
test("foo", t => {
  const { convert, create } = require("../index.js");
  let destFile = path.join(output, "merged.pdf");
  let pdfs = convert(input, output);
  // create(pdfs, destFile);
  // log(`destFile: ${destFile}`);
  t.pass();
});
