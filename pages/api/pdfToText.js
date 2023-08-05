var request = require("request");
var formidable = require("formidable");
const pdf = require("pdf-parse");
var fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      let dataBuffer = fs.readFileSync(files.pdf.path);
      pdf(dataBuffer)
        .then(function (data) {
          res.status(200).json({ text: data.text });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(403).json({ error });
  }
}
