const fs = require("fs");
const path = require("path");

const outputFolder = path.join(__dirname, "..", "public/outputs");

const keywords = ["javascript", "html", "css", "mysql", "yasmani"];

const resumen = [];

const matchKeywords = async (file) => {
  const record = file.slice(0, -4);
  resumen.push({ file: record, keywords: [] });

  const data = fs
    .readFileSync(`${outputFolder}/${file}`, "utf-8", (err, data) => {
      if (err) {
        console.log("error: ", err);
      } else {
        console.log(data);
      }
    })
    .split(/[ ;?*!~,`"&|()<>{}\[\]\r\n\\]+/)
    .map((word) =>
      word
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
    );

  keywords.forEach(async (element) => {
    let result = data.some((word) => word.includes(element));
    const el = await resumen.find((obj) => obj.file === record);
    el.keywords.push({ name: element, value: result });
  });
};

const getOutputFiles = async () => {
  fs.readdirSync(outputFolder).forEach((file) => {
    matchKeywords(file);
  });
  return resumen;
};

module.exports = { getOutputFiles };
