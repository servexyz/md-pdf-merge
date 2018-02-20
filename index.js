const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const log = console.log;

function basename(path) {
  let fileExt = path.split("/").reverse()[0];
  return fileExt.replace(/\.[^/.]+$/, "");
}

function convertMarkdownToPDF(inputDir, outputDir) {
  const markdownpdf = require("markdown-pdf");
  return fs
    .readdirSync(inputDir)
    .filter(file => {
      //TODO: Replace with regex
      return file.includes(".md") || file.includes(".MD");
    })
    .map(md => {
      return path.join(inputDir, md);
    })
    .map(mdPath => {
      let filename = basename(mdPath);
      let pdfPath = path.join(outputDir, `${filename}.pdf`);
      log(`.md: \t`, chalk.blue(mdPath));
      log(`.pdf: \t`, chalk.green(pdfPath));
      markdownpdf()
        .from(mdPath)
        .to(pdfPath, () => {
          log(`Finished creasting PDF`);
        });
      return pdfPath;
    });
}

function createMergedPDF(pdfs, destFile) {
  const merge = require("easy-pdf-merge");
  merge(pdfs, destFile, err => {
    if (err) return log(err);
    log(`Created ${chalk.green(mergedFileDestination)}`);
  });
}

module.exports = {
  convert: convertMarkdownToPDF,
  create: createMergedPDF
};
