const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST" || !req.body) {
    res.json({ status: 400 });
    res.end();
    return;
  }
  const { email } = req.body;
  try {
    const msg = {
      to: process.env.EMAIL_RECEIVER,
      from: process.env.EMAIL_SENDER,
      subject: "Customer signed up to Fathom blog.",
      html: `<div>
                <p>Email Address signed up: <a href="mailto:${email}">${email}</a></p>
            </div>
        `,
    };

    await sgMail.send(msg);
    res.status(200).json({
      message: "Email is sent successfully.",
      status: true,
    });
  } catch (error) {
    console.log(error.response.body);
    res.status(403).json({ error });
  }
}
