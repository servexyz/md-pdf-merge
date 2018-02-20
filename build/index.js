const merge = require("easy-pdf-merge");

const md2pdf = require("markdown-pdf");

const path = require("path");

const fs = require("fs-extra");

const chalk = require("chalk");

const log = console.log;

function basename(path) {
  return path.split("/").reverse()[0];
}

function convertMarkdownToPDF(inputDir, outputDir) {
  fs.readdirSync(inputDir).filter(file => {
    log(`File: ${file}`); //TODO: Replace with regex

    return file.includes(".md") || file.includes(".MD");
  }).map(md => {
    return path.join(inputDir, md);
  }).map(mdPath => {
    log(`mdPath: ${mdPath}`);
    let filename = basename(mdPath);
    let pdfPath = path.join(outputDir, `${filename}.pdf`);
    return md2pdf().from(mdPath).to(pdfPath);
  });
}

function createMergedPDF(directoryOfPDFs, destFile = "merged.pdf") {
  let pdfs = [];
  let destFilePath = path.join(directoryOfPDFs, destFile);
  fs.readdirSync(directoryOfPDFs).map(pdf => {
    pdfs.push(pdf);
  });

  if (pdfs.length > 1) {
    merge(pdfs, destFilePath, err => {
      if (err) {
        log(`Failed to merge PDFs. ${chalk.red(pdf)}`);
      }
    });
  } else {
    numFiles = pdfs.length++;
    console.error(`Merge requires at least 2 PDFs. Your directory contains ${chalk.blue(numFiles)}`);
  }
} //TEST


const input = path.join(__dirname, "../tests/sandbox/input");
const output = path.join(__dirname, "../tests/sandbox/output");
convertMarkdownToPDF(input, output);
createMergedPDF(output);
//# sourceMappingURL=index.js.map