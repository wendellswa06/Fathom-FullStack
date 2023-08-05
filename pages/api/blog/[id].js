const sql = require("../../../utils/dbConnect");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        sql.query(
          "SELECT * FROM blogs WHERE id=?",
          [query.id],
          (err, blogs) => {
            if (err) {
              console.log("error: ", err);
              return;
            }

            res.status(200).json({ success: true, data: blogs[0] });
          }
        );
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const {
          title,
          content,
          description,
          coverImage,
          id,
          published,
          created_at,
          read_time,
        } = req.body;

        sql.query(
          "UPDATE blogs SET draft=?, published=?, trashed=0, title=?, content=?,description=?, cover_url=?, created_at=?, read_time=? WHERE id=?",
          [
            published ? 0 : 1,
            published ? 1 : 0,
            title,
            content,
            description,
            coverImage,
            created_at,
            read_time,
            id,
          ],
          (err, result) => {
            if (err) {
              console.log("error: ", err);
              return;
            }
          }
        );

        res.status(201).json({
          success: true,
          message: `${published ? "Published" : "Updated"} successfully!`,
        });
      } catch (error) {}
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
