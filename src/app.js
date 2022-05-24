const extractor = require("./extractor.js");
const matcher = require("./matcher.js");

(async () => {
  await extractor.getInputFiles();
  const data = matcher.getOutputFiles();
  console.log(data[0]);
})();
