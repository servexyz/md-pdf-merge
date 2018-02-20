const merge = require("easy-pdf-merge");
const mdpdf = require("markdown-pdf");
const path = require("path");
const fs = require("fs-extra");
const log = console.log;
//paths

function PDFGen(directory) {
  fs
    .readdirSync(directory)
    .filter(file => {
      log(`File: ${file}`);
      //TODO: Replace with regex
      return file.includes(".pdf") || file.includes(".PDF");
    })
    .map(pdf => {
      log(`PDF: ${pdf}`);
    });
}

const root = path.join(__dirname, "../tests/sandbox");
log(`root: ${root}`);
PDFGen(root);
