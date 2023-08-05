const sql = require("../../utils/dbConnect");

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        sql.query(
          "SELECT id, title, cover_url, created_at FROM blogs WHERE trashed=1 ORDER BY created_at DESC",
          (err, blogs) => {
            if (err) {
              console.log("error: ", err);
              return;
            }

            res.status(200).json({ success: true, data: blogs });
          }
        );
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
