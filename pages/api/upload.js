var formidable = require("formidable");
const aws = require("aws-sdk");

export const config = {
  api: {
    bodyParser: false,
  },
};

aws.config.loadFromPath("./certificates/config.json");
const spacesEndpoint = new aws.Endpoint("sfo3.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

const s3Stream = require("s3-upload-stream")(s3);

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.onPart = function (part) {
    console.log("file detail for uploading :>> ", part);
    const upload = s3Stream.upload({
      Bucket: "fathom-storage",
      Key: part.filename,
      ACL: "public-read",
      ContentType: part.mime,
    });

    upload.concurrentParts(5);

    upload.on("uploaded", function (details) {
      console.log("uploaded file", details);
      // https://fathom-storage.sfo3.cdn.digitaloceanspaces.com/blog2.jpg
      res.status(200).json({
        result: [
          {
            url:
              "https://fathom-storage.sfo3.cdn.digitaloceanspaces.com/" +
              details.Key,
            name: details.Key,
          },
        ],
      });
    });

    part.pipe(upload);
  };

  await form.parse(req);
}
