const fs = require("fs");
const path = require("path");
const PDFParser = require("pdf2json");

const inputFolder = path.join(__dirname, "..", "public/inputs");
const outputFolder = path.join(__dirname, "..", "public/outputs");

const extractPdfText = async (fileName) => {
  let pdfParser = new PDFParser(this, 1);

  pdfParser.on("pdfParser_dataError", (errData) =>
    console.error(errData.parserError),
  );

  pdfParser.on("pdfParser_dataReady", (pdfData) => {
    fs.writeFile(
      `${outputFolder}/${path.parse(`${outputFolder}/${fileName}`).name}.txt`,
      pdfParser.getRawTextContent(),
      () => {
        console.log("Done.");
      },
    );
  });

  pdfParser.loadPDF(`${inputFolder}/${fileName}`);
};

const getInputFiles = async () => {
  fs.readdirSync(inputFolder).forEach((file) => {
    extractPdfText(file);
  });
  return true;
};

module.exports = { getInputFiles };
