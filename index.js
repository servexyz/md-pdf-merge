const path = require("path");
var markdownpdf = require("markdown-pdf");
var fs = require("fs-extra");
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
      fs
        .createReadStream(mdPath)
        .pipe(markdownpdf())
        .pipe(fs.createWriteStream(pdfPath));
      // markdownpdf()
      //   .from(mdPath)
      //   .to(pdfPath, () => {
      //     log(`Finished creasting PDF`);
      //   });
      return pdfPath;
    });
}

// function createMergedPDF(pdfs, destFile) {
//   const merge = require("pdf-merge");
//   log(`merge`);
//   merge(pdfs, { output: destFile })
//     .then(buff => {
//       log(`buff: ${buff}`);
//     })
//     .catch(err => {
//       log(`Failed to merge. \n ${chalk.red(err)}`);
//     });
//   log(`fin`);
// }
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
