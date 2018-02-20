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
      fs.ensureFileSync(pdfPath);
      let writer = fs
        .createReadStream(mdPath)
        .pipe(markdownpdf())
        .pipe(fs.createWriteStream(pdfPath));

      if (writer.bytesWritten === 0) {
        log(`${chalk.red("0 bytes written")}`);
      }

      return pdfPath;
    });
}

function createMergedPDF(pdfs, destFile) {
  const merge = require("easy-pdf-merge");
  merge(pdfs, destFile, err => {
    if (err) log(`Failed to create merged PDF. \n ${err}`);
    log(`Created ${chalk.green(destFile)}`);
  });
}

module.exports = {
  convert: convertMarkdownToPDF,
  create: createMergedPDF
};
