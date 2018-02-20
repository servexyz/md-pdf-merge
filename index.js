const path = require("path");
const markdownpdf = require("markdown-pdf");
const fs = require("fs-extra");
const chalk = require("chalk");
const log = console.log;

function basename(path) {
  let fileExt = path.split("/").reverse()[0];
  return fileExt.replace(/\.[^/.]+$/, "");
}

function convertMarkdownToPDF(inputDir, outputDir) {
  let mds = [];
  let pdfPaths = fs
    .readdirSync(inputDir)
    .filter(file => {
      //TODO: Replace with regex
      return file.includes(".md") || file.includes(".MD");
    })
    .map(md => {
      return path.join(inputDir, md);
    })
    .map(mdPath => {
      mds.push(mdPath);
      let filename = basename(mdPath);
      let pdfPath = path.join(outputDir, `${filename}.pdf`);
      log(`.md: \t`, chalk.blue(mdPath));
      log(`.pdf: \t`, chalk.green(pdfPath));
      return pdfPath;
    });
  log(JSON.stringify(mds, null, 2));
  markdownpdf()
    .concat.from(mds)
    .to("./tests/sandbox/output/merged.pdf", function() {
      log(`Done`);
    });

  return pdfPaths;
}

// function createMergedPDF(pdfs, destFile) {
//   const merge = require("easy-pdf-merge");
//   merge(pdfs, destFile, err => {
//     if (err) log(`Failed to create merged PDF. \n ${chalk.red(err)}`);
//     log(`Created ${chalk.green(destFile)}`);
//   });
// }

module.exports = {
  convert: convertMarkdownToPDF,
  create: createMergedPDF
};
