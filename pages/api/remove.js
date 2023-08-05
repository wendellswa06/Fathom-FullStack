const sql = require("../../utils/dbConnect");

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        let ids = req.body;
        for (let i = 0; i < ids.length; i++) {
          sql.query("DELETE FROM blogs WHERE id=?", [ids[i]], (err, result) => {
            if (err) {
              console.log("error: ", err);
              return;
            }
          });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
