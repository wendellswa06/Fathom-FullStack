const sql = require("../../utils/dbConnect");

export default async function handler(req, res) {
  const { user } = req.body;
  console.log("user :>> ", user);

  try {
    sql.query(
      "SELECT * FROM users WHERE email=? AND password=?",
      [user.email, user.password],
      (err, users) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
        return res.status(200).json({ user: users });
      }
    );
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
