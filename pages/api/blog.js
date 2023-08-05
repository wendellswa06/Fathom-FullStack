const sql = require("../../utils/dbConnect");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        sql.query(
          "SELECT * FROM blogs WHERE published=1 ORDER BY created_at DESC",
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
    case "POST":
      try {
        const {
          title,
          content,
          published,
          draft,
          description,
          coverImage,
          created_at,
          read_time,
        } = req.body;
        const now = new Date();
        console.log("published :>> ", published);
        sql.query(
          "INSERT INTO blogs (title, content, published, draft,description, cover_url, created_at, updated_at, read_time) VALUES ?",
          [
            [
              [
                title,
                content,
                published,
                draft,
                description,
                coverImage,
                created_at,
                now,
                read_time,
              ],
            ],
          ],
          (err, blog) => {
            if (err) {
              console.log("error: ", err);
              return;
            }

            console.log("created blog:>> ", blog);

            if (req.body.published)
              res.status(201).json({ message: "Blog published successfully" });
            else {
              res.status(201).json({
                message: "Blog added successfully",
                blogId: blog.insertId,
              });
            }
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
