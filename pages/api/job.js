var request = require("request");
var formidable = require("formidable");
var fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const { method } = req;

    switch (method) {
      case "POST":
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, async (err, fields, files) => {
          var options = {
            method: "POST",
            url: `https://api.lever.co/v1/uploads`,
            auth: {
              username: "eOXN779Y5RtaVPYZ+w+VLtNAmLyNjB0U5XsuD0IePg+6zzFZ",
              password: "",
            },
            formData: {
              file: {
                value: fs.createReadStream(files.resume.path),
                options: {
                  filename: "",
                  contentType: null,
                },
              },
            },
          };

          request(options, function (error, response) {
            if (error) throw new Error(error);
            try {
              const formData = JSON.parse(fields.formData);

              formData.personalInformation[4].value = JSON.parse(
                response.body
              ).data.uri; //resume

              const options1 = {
                method: "POST",
                url: `https://api.lever.co/v1/postings/${fields.id}/apply`,
                auth: {
                  username: "eOXN779Y5RtaVPYZ+w+VLtNAmLyNjB0U5XsuD0IePg+6zzFZ",
                  password: "",
                },
                json: formData,
              };

              request(options1, function (error, response, body) {
                if (error) throw new Error(error);
                console.log("response final:>> ", response.body);
                res.status(200).json(response.body);
              });
            } catch (err) {
              throw new Error(error);
            }
          });
        });
        break;
      case "GET":
        const { job_id } = req.query;
        console.log("job_id :>> ", job_id);
        var options = {
          method: "GET",
          url: `https://api.lever.co/v1/postings/${job_id}/apply`,
          auth: {
            username: "iJT3dCDIemkzlpNTuwm0B953Eb+b7VxQ/P3O2/bRIMekyOyt",
            password: "",
          },
        };

        request(options, function (error, response) {
          if (error) throw new Error(error);
          res.status(200).json(response.body);
        });
        break;
      default:
        break;
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(403).json({ error });
  }
}
